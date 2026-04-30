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
}
