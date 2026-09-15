<?php namespace Vanderbilt\EpicParticipantUpdater\App\Services;

/**
 * Owns a private temporary archive file from retrieval through verification and delivery.
 * Closing the object removes only its own file; stored edocs are never owned here.
 */
final class LogArchiveFile
{
    public const IO_BYTES = 65536;
    public const MAX_FILE_BYTES = 2147483648;
    public const DISK_RESERVE_BYTES = 16777216;

    private $path;
    private $filename;
    private $mimeType;

    private function __construct(string $path, string $filename, string $mimeType)
    {
        $this->path = $path;
        $this->filename = $filename;
        $this->mimeType = $mimeType;
    }

    /** Create an empty, exclusively owned file in REDCap's private temporary directory. */
    public static function create(string $filename, string $mimeType): self
    {
        $directory = self::getTemporaryDirectory();
        self::requireDiskSpace($directory, self::IO_BYTES);
        $path = tempnam($directory, 'epu_archive_');
        if ($path === false) throw new \RuntimeException('Could not create archive temporary file.');
        @chmod($path, 0600);
        return new self($path, $filename, $mimeType);
    }

    /** ZIP and disk-space APIs require a local temporary directory even when edocs use a stream wrapper. */
    public static function getTemporaryDirectory(): string
    {
        if (defined('APP_PATH_TEMP') && stream_is_local(APP_PATH_TEMP) && is_dir(APP_PATH_TEMP) && is_writable(APP_PATH_TEMP)) {
            return rtrim(APP_PATH_TEMP, DIRECTORY_SEPARATOR);
        }
        return sys_get_temp_dir();
    }

    /** Return the owned path for file-based ZIP and REDCap storage APIs. */
    public function getPath(): string { return $this->path; }

    /** Return the intended download name independently of temporary and stored names. */
    public function getFilename(): string { return $this->filename; }

    /** Return the content type established by the archive service. */
    public function getMimeType(): string { return $this->mimeType; }

    /** Read actual bytes on disk, never relying on upload metadata or the stat cache. */
    public function getSize(): int
    {
        clearstatcache(true, $this->path);
        $size = filesize($this->path);
        if ($size === false) throw new \RuntimeException('Could not read archive file size.');
        return $size;
    }

    /** Copy a source file incrementally and reject missing, oversized, or partial reads. */
    public function copyFromPath(string $sourcePath, int $maxBytes = self::MAX_FILE_BYTES): void
    {
        $source = @fopen($sourcePath, 'rb');
        if ($source === false) throw new \RuntimeException('Archive file could not be read.');
        try {
            $stat = fstat($source);
            if (!$stat || $stat['size'] < 1 || $stat['size'] > $maxBytes) {
                throw new \RuntimeException('Archive file is empty or exceeds the supported size.');
            }
            self::requireDiskSpace(dirname($this->path), $stat['size']);
            $this->copyFromStream($source, $maxBytes);
            if ($this->getSize() !== $stat['size']) throw new \RuntimeException('Archive file read was incomplete.');
        } finally {
            fclose($source);
        }
    }

    /** Consume a readable stream, including non-seekable streams, without keeping its body in memory. */
    public function copyFromStream($source, int $maxBytes = self::MAX_FILE_BYTES): void
    {
        if (!is_resource($source)) throw new \RuntimeException('Archive source is not a readable stream.');
        $target = fopen($this->path, 'wb');
        if (!$target) throw new \RuntimeException('Could not open archive temporary file.');
        $bytes = 0;
        try {
            while (!feof($source)) {
                $chunk = fread($source, self::IO_BYTES);
                if ($chunk === false || ($chunk === '' && !feof($source))) throw new \RuntimeException('Archive stream read failed.');
                $bytes += strlen($chunk);
                if ($bytes > $maxBytes) throw new \RuntimeException('Archive file exceeds the supported size.');
                self::requireDiskSpace(dirname($this->path), strlen($chunk));
                self::writeAll($target, $chunk);
            }
            if ($bytes < 1 || !fflush($target)) throw new \RuntimeException('Archive stream is empty or incomplete.');
        } finally {
            fclose($target);
        }
    }

    /** Write every byte, handling short writes and zero-progress storage failures. */
    public static function writeAll($handle, string $data): void
    {
        $length = strlen($data);
        for ($offset = 0; $offset < $length;) {
            $written = fwrite($handle, substr($data, $offset, self::IO_BYTES));
            if ($written === false || $written === 0) throw new \RuntimeException('Could not write complete archive content.');
            $offset += $written;
        }
    }

    /** Leave free space for finalization and fail before consuming the remaining disk. */
    public static function requireDiskSpace(string $directory, int $bytes): void
    {
        $free = disk_free_space($directory);
        if ($free === false || $free < $bytes + self::DISK_RESERVE_BYTES) {
            throw new \RuntimeException('Insufficient temporary disk space for log archiving.');
        }
    }

    /** Read a small metadata file with a hard limit before JSON decoding. */
    public function readMetadata(int $maxBytes): string
    {
        $size = $this->getSize();
        if ($size < 1 || $size > $maxBytes) throw new \RuntimeException('Archive manifest is empty or exceeds the supported size.');
        $contents = file_get_contents($this->path, false, null, 0, $maxBytes + 1);
        if ($contents === false || strlen($contents) !== $size) throw new \RuntimeException('Archive manifest read was incomplete.');
        return $contents;
    }

    /** Release the temporary file after verification, failed delivery, or normal completion. */
    public function close(): void
    {
        if ($this->path !== '' && is_file($this->path)) @unlink($this->path);
        $this->path = '';
    }

    public function __destruct() { $this->close(); }
}
