<?php namespace Vanderbilt\EpicParticipantUpdater\App\Services;

/**
 * Stores and reads archive artifacts through REDCap edoc APIs.
 */
class LogArchiveEdocStorage
{
    /**
     * Upload a local archive artifact into REDCap edocs.
     *
     * @param string $sourcePath
     * @param string $downloadName
     * @return array
     */
    public function storeFile($sourcePath, $downloadName): array
    {
        if(!file_exists($sourcePath))
        {
            throw new \RuntimeException('Archive source file does not exist.');
        }

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

        return [
            'doc_id' => intval($docId),
            'filename' => $downloadName,
            'size' => $info ? intval($info['doc_size']) : intval($file['size']),
            'mime_type' => $info ? $info['mime_type'] : null,
        ];
    }

    /**
     * Read an edoc artifact back for verification or download.
     *
     * @param int $docId
     * @return array|false
     */
    public function readFile($docId)
    {
        $attributes = \Files::getEdocContentsAttributes(intval($docId));
        if(!$attributes) return false;

        return [
            'mime_type' => $attributes[0],
            'filename' => $attributes[1],
            'contents' => $attributes[2],
        ];
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
        $uploadPath = tempnam($this->getTempDirectory(), 'epu_edoc_');
        if($uploadPath === false)
        {
            throw new \RuntimeException('Could not prepare archive upload file.');
        }

        if(!copy($sourcePath, $uploadPath))
        {
            throw new \RuntimeException('Could not prepare archive upload file.');
        }

        return $uploadPath;
    }

    private function getTempDirectory(): string
    {
        if(defined('APP_PATH_TEMP') && is_dir(APP_PATH_TEMP))
        {
            return rtrim(APP_PATH_TEMP, DIRECTORY_SEPARATOR);
        }
        return sys_get_temp_dir();
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
