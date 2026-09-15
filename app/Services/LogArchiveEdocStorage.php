<?php namespace Vanderbilt\EpicParticipantUpdater\App\Services;

/**
 * Stores and reads archive artifacts through REDCap edoc APIs.
 */
class LogArchiveEdocStorage
{
    private const LOCAL_STORAGE_OPTION = '0';
    // Older non-local REDCap helpers buffer entire objects. Bound those calls before invoking them.
    private const MAX_BUFFERED_EDOC_BYTES = 67108864;
    /**
     * Upload a local archive artifact into REDCap edocs.
     *
     * @param string $sourcePath
     * @param string $downloadName
     * @return array
     */
    public function storeFile(string $sourcePath, string $downloadName): array
    {
        if(!is_file($sourcePath) || !is_readable($sourcePath))
        {
            throw new \RuntimeException('Archive source file does not exist.');
        }

        clearstatcache(true, $sourcePath);
        $sourceSize = filesize($sourcePath);
        $this->checkSize($sourceSize);

        $uploadPath = $this->copyToUploadTemp($sourcePath);
        $file = [
            'tmp_name' => $uploadPath,
            'name' => $downloadName,
            'size' => filesize($uploadPath),
        ];

        try {
            $docId = \Files::uploadFile($file, null);
        } finally {
            if(file_exists($uploadPath))
            {
                unlink($uploadPath);
            }
        }

        if(!$docId)
        {
            throw new \RuntimeException("Could not upload archive file {$downloadName}.");
        }

        $info = \Files::getEdocInfo(intval($docId));
        if (!$info || intval($info['doc_size']) !== $sourceSize) {
            $this->deleteFile($docId);
            throw new \RuntimeException('Stored archive metadata does not match the uploaded file.');
        }

        return [
            'doc_id' => intval($docId),
            'filename' => $downloadName,
            'size' => $sourceSize,
            'mime_type' => $info['mime_type'],
        ];
    }

    /**
     * Read an edoc artifact back for verification or download.
     *
     * @param int $docId
     * @return LogArchiveFile|false Caller owns the temporary snapshot and must close it.
     */
    public function readFile(int $docId)
    {
        $info = \Files::getEdocInfo($docId);
        if (!$info) return false;
        $this->checkSize(intval($info['doc_size']));
        $file = LogArchiveFile::create($info['doc_name'], $info['mime_type'] ?: 'application/octet-stream');
        $legacyPath = null;
        try {
            if ($this->usesLocalStorage()) {
                // Resolve REDCap's project subfolder, then stream; the core contents helper materializes the file.
                $source = EDOC_PATH . \Files::getLocalStorageSubfolder($info['project_id'], true) . $info['stored_name'];
            } else {
                // Reuse core provider dispatch and its owned temp-file result instead of casting an SDK body to text.
                $legacyPath = \Files::copyEdocToTemp($docId, true, true);
                if (!$legacyPath) throw new \RuntimeException('Archive file could not be retrieved from storage.');
                $source = $legacyPath;
            }
            $file->copyFromPath($source, intval($info['doc_size']));
            if ($file->getSize() !== intval($info['doc_size'])) throw new \RuntimeException('Stored archive size does not match its metadata.');
            return $file;
        } catch (\Throwable $error) {
            $file->close();
            throw $error;
        } finally {
            if ($legacyPath && is_file($legacyPath)) @unlink($legacyPath);
        }
    }

    /**
     * Soft-delete an archive edoc through REDCap file metadata handling.
     *
     * @param int $docId
     * @return bool
     */
    public function deleteFile($docId)
    {
        $docId = intval($docId);
        if($docId < 1) return false;

        $info = \Files::getEdocInfo($docId, false, true);
        if(!$info) return false;
        if(!empty($info['delete_date'])) return true;

        if($info['project_id'] !== null && $info['project_id'] !== '' && is_numeric($info['project_id']))
        {
            return (bool)\Files::deleteFileByDocId($docId, intval($info['project_id']));
        }

        return $this->softDeleteSystemEdoc($docId);
    }

    private function copyToUploadTemp($sourcePath): string
    {
        // Stage local uploads on the destination filesystem so REDCap can finalize them by rename.
        $directory = $this->usesLocalStorage() ? rtrim(EDOC_PATH, DIRECTORY_SEPARATOR) : LogArchiveFile::getTemporaryDirectory();
        if (!is_dir($directory) || !is_writable($directory)) throw new \RuntimeException('Archive staging directory is not writable.');
        LogArchiveFile::requireDiskSpace($directory, filesize($sourcePath));
        $uploadPath = tempnam($directory, 'epu_edoc_');
        if($uploadPath === false)
        {
            throw new \RuntimeException('Could not prepare archive upload file.');
        }

        if(!copy($sourcePath, $uploadPath))
        {
            @unlink($uploadPath);
            throw new \RuntimeException('Could not prepare archive upload file.');
        }

        clearstatcache(true, $uploadPath);
        if (filesize($uploadPath) !== filesize($sourcePath)) {
            @unlink($uploadPath);
            throw new \RuntimeException('Archive upload copy was incomplete.');
        }

        return $uploadPath;
    }

    private function usesLocalStorage(): bool
    {
        return (string)($GLOBALS['edoc_storage_option'] ?? self::LOCAL_STORAGE_OPTION) === self::LOCAL_STORAGE_OPTION;
    }

    private function checkSize($size): void
    {
        $limit = $this->usesLocalStorage() ? LogArchiveFile::MAX_FILE_BYTES : self::MAX_BUFFERED_EDOC_BYTES;
        if (!is_int($size) || $size < 1 || $size > $limit) {
            throw new \RuntimeException('Archive file is empty or exceeds the storage size limit.');
        }
    }

    private function softDeleteSystemEdoc($docId): bool
    {
        // REDCap's public delete helper requires a project id, while module archives are stored without one.
        $query = db_query(
            "UPDATE redcap_edocs_metadata
             SET delete_date = ?
             WHERE doc_id = ? AND delete_date IS NULL AND project_id IS NULL",
            [date('Y-m-d H:i:s'), intval($docId)]
        );

        if(!$query) return false;

        return db_affected_rows() > 0 || (bool)\Files::wasEdocDeleted($docId);
    }
}
