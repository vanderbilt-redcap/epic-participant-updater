<?php namespace Vanderbilt\EpicParticipantUpdater\App\Services;

use Vanderbilt\EpicParticipantUpdater\EpicParticipantUpdater;

/**
 * Archives the module's hot External Module logs month-by-month with verified cold storage.
 */
class LogArchiveService
{
    const DEFAULT_RETENTION_DAYS = 30;
    const ARCHIVE_INDEX_SETTING = 'log_archive_index_json';
    const ARCHIVE_SCHEMA_VERSION = 1;
    const ARCHIVE_FORMAT_ZIP = 'zip';

    const STATUS_ALREADY_ARCHIVED = 'already_archived';
    const STATUS_ALREADY_DELETED = 'already_deleted';
    const STATUS_ARCHIVED = 'archived';
    const STATUS_ARCHIVED_AND_DELETED = 'archived_and_deleted';
    const STATUS_DELETED = 'deleted';
    const STATUS_ERROR = 'error';
    const STATUS_NO_ELIGIBLE_LOGS = 'no_eligible_logs';
    const STATUS_NO_LOGS_IN_MONTH = 'no_logs_in_month';
    const STATUS_VERIFIED = 'verified';

    const LOG_MESSAGE_ARCHIVE_RUN = 'log archive run';

    private static $LOG_FIELDS = [
        'log_id',
        'timestamp',
        'username AS user',
        'ip',
        '_project_id AS project_id',
        '_record_id AS record',
        'message',
        'status',
        'description',
        'MRN',
        'study_id',
        'event_id',
        'epic_status',
        'save_action',
        'save_error_count',
        'save_item_count',
        'save_errors',
    ];

    private $module;
    private $repository;
    private $storage;
    private $now;

    /**
     * @param EpicParticipantUpdater|null $module
     * @param object|null $repository Object exposing the LogArchiveLogRepository public methods.
     * @param object|null $storage Object exposing the LogArchiveEdocStorage public methods.
     * @param string|\DateTimeInterface|null $now
     */
    public function __construct($module = null, $repository = null, $storage = null, $now = null)
    {
        $this->module = $module ?: EpicParticipantUpdater::getInstance();
        $this->repository = $repository ?: new LogArchiveLogRepository($this->module, self::$LOG_FIELDS);
        $this->storage = $storage ?: new LogArchiveEdocStorage();
        $this->now = $now;
    }

    /**
     * Find and archive the oldest log month that preserves the hot-log coverage window.
     *
     * @param int|null $retentionDays
     * @param string|\DateTimeInterface|null $now
     * @return array
     */
    public function archiveOldestEligibleMonth($retentionDays = null, $now = null): array
    {
        $window = $this->findOldestEligibleMonth($retentionDays, $now);
        if($window === null)
        {
            return [
                'status' => self::STATUS_NO_ELIGIBLE_LOGS,
                'message' => 'No oldest log month is old enough to archive.',
            ];
        }

        return $this->archiveMonth($window);
    }

    /**
     * Archive the oldest eligible month, verify the stored files, and delete hot rows.
     *
     * @param int|null $retentionDays
     * @param string|\DateTimeInterface|null $now
     * @return array
     */
    public function archiveAndCleanupOldestEligibleMonth($retentionDays = null, $now = null): array
    {
        try {
            $archiveResult = $this->archiveOldestEligibleMonth($retentionDays, $now);
            if(!in_array($archiveResult['status'], [self::STATUS_ARCHIVED, self::STATUS_ALREADY_ARCHIVED]))
            {
                $this->logArchiveRun($archiveResult);
                return $archiveResult;
            }

            $cleanupResult = $this->cleanupArchivedMonth($archiveResult['month']);
            $result = array_merge($archiveResult, [
                'status' => $cleanupResult['status'] === self::STATUS_DELETED ? self::STATUS_ARCHIVED_AND_DELETED : $cleanupResult['status'],
                'deleted_count' => $cleanupResult['deleted_count'],
            ]);
            $this->logArchiveRun($result);
            return $result;
        } catch(\Exception $exception) {
            $result = [
                'status' => self::STATUS_ERROR,
                'message' => $exception->getMessage(),
            ];
            $this->logArchiveRun($result);
            return $result;
        }
    }

    /**
     * Locate the oldest log month whose end is at least the retention window old.
     *
     * @param int|null $retentionDays
     * @param string|\DateTimeInterface|null $now
     * @return array|null
     */
    public function findOldestEligibleMonth($retentionDays = null, $now = null): ?array
    {
        $eligibleBefore = $this->getEligibleBefore($retentionDays, $now);
        $oldestTimestamp = $this->repository->getOldestTimestampBefore($this->formatDate($eligibleBefore));
        if(empty($oldestTimestamp)) return null;

        $oldest = $this->dateTime($oldestTimestamp);
        $monthStart = $oldest->modify('first day of this month')->setTime(0, 0, 0);
        $monthEnd = $monthStart->modify('+1 month');
        if($monthEnd > $eligibleBefore)
        {
            return null;
        }

        return [
            'month' => $monthStart->format('Y-m'),
            'start' => $this->formatDate($monthStart),
            'end' => $this->formatDate($monthEnd),
            'eligible_before' => $this->formatDate($eligibleBefore),
            'first_available_timestamp' => $this->formatDate($oldest),
            'is_partial_oldest_month' => $oldest > $monthStart,
        ];
    }

    /**
     * Get the exclusive cutoff used to preserve at least the configured hot-log coverage.
     *
     * @param int|null $retentionDays
     * @param string|\DateTimeInterface|null $now
     * @return \DateTimeImmutable
     */
    public function getEligibleBefore($retentionDays = null, $now = null): \DateTimeImmutable
    {
        $days = intval($retentionDays === null ? self::DEFAULT_RETENTION_DAYS : $retentionDays);
        if($days < 1) $days = self::DEFAULT_RETENTION_DAYS;

        $current = $this->dateTime($now ?: $this->now ?: 'now');
        return $current->modify("-{$days} days");
    }

    /**
     * Write one month of logs to edocs and persist its archive index entry.
     *
     * @param array $window
     * @return array
     */
    public function archiveMonth(array $window): array
    {
        $month = $window['month'];
        $index = $this->getArchiveIndex();
        if(isset($index[$month]))
        {
            return [
                'status' => self::STATUS_ALREADY_ARCHIVED,
                'month' => $month,
                'archive' => $index[$month],
            ];
        }

        $rows = $this->repository->getLogsForWindow($window['start'], $window['end']);
        if(empty($rows))
        {
            return [
                'status' => self::STATUS_NO_LOGS_IN_MONTH,
                'month' => $month,
            ];
        }

        $jsonlPath = null;
        $archivePath = null;
        $manifestPath = null;

        try {
            $jsonlPath = $this->createTempFile('epu_archive_jsonl_');
            $rowStats = $this->writeArchiveRows($jsonlPath, $rows);

            $archivePath = $this->createTempFile('epu_archive_zip_');
            $archiveStats = array_merge(
                $rowStats,
                $this->writeZipArchive($jsonlPath, "epu_logs_{$month}.jsonl", $archivePath)
            );

            $archiveFile = $this->storeWithFallback($archivePath, [
                "epu_logs_{$month}.zip",
                "epu_logs_{$month}.txt",
            ]);

            $manifest = $this->buildManifest($window, $archiveStats, $archiveFile);
            $manifestPath = $this->createTempFile('epu_manifest_');
            $this->writeJsonFile($manifestPath, $manifest);

            $manifestFile = $this->storeWithFallback($manifestPath, [
                "epu_logs_{$month}.manifest.json",
                "epu_logs_{$month}.manifest.txt",
            ]);

            $entry = $manifest;
            $entry['manifest_doc_id'] = $manifestFile['doc_id'];
            $entry['manifest_filename'] = $manifestFile['filename'];
            $entry['manifest_size'] = $manifestFile['size'];
            $entry['manifest_mime_type'] = $manifestFile['mime_type'];

            $index[$month] = $entry;
            $this->saveArchiveIndex($index);

            return [
                'status' => self::STATUS_ARCHIVED,
                'month' => $month,
                'archive' => $entry,
            ];
        } finally {
            $this->removeTempFile($jsonlPath);
            $this->removeTempFile($archivePath);
            $this->removeTempFile($manifestPath);
        }
    }

    /**
     * Verify an archived month and remove the matching hot log rows.
     *
     * @param string $month
     * @return array
     */
    public function cleanupArchivedMonth($month): array
    {
        $index = $this->getArchiveIndex();
        if(!isset($index[$month]))
        {
            throw new \RuntimeException("No archive index entry found for {$month}.");
        }

        $entry = $index[$month];
        if(isset($entry['cleanup_status']) && $entry['cleanup_status'] === self::STATUS_DELETED)
        {
            return [
                'status' => self::STATUS_ALREADY_DELETED,
                'month' => $month,
                'deleted_count' => intval($entry['deleted_count'] ?? 0),
                'archive' => $entry,
            ];
        }

        $verification = $this->verifyArchiveEntry($entry);
        $deletedCount = $this->repository->deleteLogsForWindow($entry['start'], $entry['end']);
        if($deletedCount === false)
        {
            throw new \RuntimeException('REDCap did not confirm log cleanup completed.');
        }
        if($deletedCount === null)
        {
            $deletedCount = $verification['row_count'];
        }

        $entry['cleanup_status'] = self::STATUS_DELETED;
        $entry['deleted_count'] = $deletedCount;
        $entry['deleted_at'] = $this->formatDate($this->dateTime($this->now ?: 'now'));
        $entry['verified_at'] = $verification['verified_at'];

        $index[$month] = $entry;
        $this->saveArchiveIndex($index);

        return [
            'status' => self::STATUS_DELETED,
            'month' => $month,
            'deleted_count' => $deletedCount,
            'archive' => $entry,
        ];
    }

    /**
     * Confirm that the archive, manifest, index entry, and current hot rows agree.
     *
     * @param array $entry
     * @return array
     */
    public function verifyArchiveEntry(array $entry): array
    {
        $required = ['month', 'start', 'end', 'row_count', 'sha256', 'archive_doc_id', 'manifest_doc_id', 'archive_format', 'archive_entry_filename'];
        foreach($required as $key)
        {
            if(!array_key_exists($key, $entry))
            {
                throw new \RuntimeException("Archive index entry is missing {$key}.");
            }
        }

        $archiveFile = $this->storage->readFile($entry['archive_doc_id']);
        $manifestFile = $this->storage->readFile($entry['manifest_doc_id']);
        if(!$archiveFile || !$manifestFile)
        {
            throw new \RuntimeException('Could not read back archive edoc files.');
        }

        $manifest = json_decode($manifestFile['contents'], true);
        if(!is_array($manifest))
        {
            throw new \RuntimeException('Archive manifest is not valid JSON.');
        }

        foreach(['month', 'start', 'end', 'row_count', 'archive_doc_id', 'sha256', 'archive_format', 'archive_entry_filename'] as $key)
        {
            if(!array_key_exists($key, $manifest) || strval($manifest[$key]) !== strval($entry[$key]))
            {
                throw new \RuntimeException("Archive manifest does not match index field {$key}.");
            }
        }

        $currentCount = $this->repository->countLogsForWindow($entry['start'], $entry['end']);
        if($currentCount !== intval($entry['row_count']))
        {
            throw new \RuntimeException('Archive row count no longer matches hot log rows.');
        }

        $archiveHash = hash('sha256', $archiveFile['contents']);
        if($archiveHash !== $entry['sha256'])
        {
            throw new \RuntimeException('Archive content hash does not match manifest.');
        }

        if($entry['archive_format'] !== self::ARCHIVE_FORMAT_ZIP)
        {
            throw new \RuntimeException('Unsupported archive format.');
        }

        $jsonlContents = $this->readZipEntryContents($archiveFile['contents'], $entry['archive_entry_filename']);
        if(isset($entry['uncompressed_sha256']) && hash('sha256', $jsonlContents) !== $entry['uncompressed_sha256'])
        {
            throw new \RuntimeException('Archive JSONL content hash does not match manifest.');
        }

        $lineCount = $this->countArchiveLines($jsonlContents);
        if($lineCount !== intval($entry['row_count']))
        {
            throw new \RuntimeException('Archive line count does not match manifest row count.');
        }

        return [
            'status' => self::STATUS_VERIFIED,
            'row_count' => $currentCount,
            'verified_at' => $this->formatDate($this->dateTime($this->now ?: 'now')),
        ];
    }

    /**
     * Read the persisted archive index from module system settings.
     *
     * @return array
     */
    public function getArchiveIndex(): array
    {
        $raw = $this->module->getSystemSetting(self::ARCHIVE_INDEX_SETTING);
        if(empty($raw)) return [];

        if(is_array($raw)) return $raw;

        $decoded = json_decode((string)$raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Save the archive index to module system settings.
     *
     * @param array $index
     * @return void
     */
    public function saveArchiveIndex(array $index): void
    {
        ksort($index);
        $encoded = $this->encodeJson($index, 0, 'log archive index');
        $this->module->setSystemSetting(self::ARCHIVE_INDEX_SETTING, $encoded);
    }

    /**
     * Return archive metadata that is safe to expose in the cold-storage UI.
     *
     * @return array
     */
    public function getArchiveList(): array
    {
        $index = $this->getArchiveIndex();
        krsort($index);

        $archives = [];
        foreach($index as $month => $entry)
        {
            $archives[] = [
                'month' => $month,
                'start' => $entry['start'] ?? '',
                'end' => $entry['end'] ?? '',
                'created_at' => $entry['created_at'] ?? '',
                'row_count' => intval($entry['row_count'] ?? 0),
                'cleanup_status' => $entry['cleanup_status'] ?? '',
                'deleted_count' => intval($entry['deleted_count'] ?? 0),
                'deleted_at' => $entry['deleted_at'] ?? '',
                'archive_filename' => $entry['archive_filename'] ?? '',
                'archive_size' => intval($entry['archive_size'] ?? 0),
                'archive_mime_type' => $entry['archive_mime_type'] ?? '',
                'archive_format' => $entry['archive_format'] ?? '',
                'manifest_filename' => $entry['manifest_filename'] ?? '',
                'manifest_size' => intval($entry['manifest_size'] ?? 0),
                'manifest_mime_type' => $entry['manifest_mime_type'] ?? '',
                'first_available_timestamp' => $entry['first_available_timestamp'] ?? '',
                'is_partial_oldest_month' => !empty($entry['is_partial_oldest_month']),
            ];
        }

        return $archives;
    }

    /**
     * Read an indexed archive artifact for a validated download request.
     *
     * @param string $month
     * @param string $fileType
     * @return array
     */
    public function getArchiveFile($month, $fileType): array
    {
        if(!preg_match('/^\d{4}-\d{2}$/', (string)$month))
        {
            throw new \InvalidArgumentException('Invalid archive month.', 400);
        }

        if(!in_array($fileType, ['archive', 'manifest']))
        {
            throw new \InvalidArgumentException('Invalid archive file type.', 400);
        }

        $index = $this->getArchiveIndex();
        if(!isset($index[$month]))
        {
            throw new \RuntimeException('Archive month not found.', 404);
        }

        $entry = $index[$month];
        $docIdKey = $fileType === 'archive' ? 'archive_doc_id' : 'manifest_doc_id';
        $filenameKey = $fileType === 'archive' ? 'archive_filename' : 'manifest_filename';
        if(empty($entry[$docIdKey]))
        {
            throw new \RuntimeException('Archive file is not indexed.', 404);
        }

        $file = $this->storage->readFile($entry[$docIdKey]);
        if(!$file)
        {
            throw new \RuntimeException('Archive file could not be read.', 404);
        }

        return [
            'filename' => $entry[$filenameKey] ?? $file['filename'],
            'mime_type' => $file['mime_type'] ?? 'application/octet-stream',
            'contents' => $file['contents'],
        ];
    }

    private function buildManifest(array $window, array $archiveStats, array $archiveFile): array
    {
        return [
            'schema_version' => self::ARCHIVE_SCHEMA_VERSION,
            'month' => $window['month'],
            'start' => $window['start'],
            'end' => $window['end'],
            'eligible_before' => $window['eligible_before'] ?? null,
            'first_available_timestamp' => $window['first_available_timestamp'] ?? $window['start'],
            'is_partial_oldest_month' => !empty($window['is_partial_oldest_month']),
            'created_at' => $this->formatDate($this->dateTime($this->now ?: 'now')),
            'row_count' => $archiveStats['row_count'],
            'first_log_id' => $archiveStats['first_log_id'],
            'last_log_id' => $archiveStats['last_log_id'],
            'sha256' => $archiveStats['sha256'],
            'archive_format' => $archiveStats['archive_format'],
            'archive_entry_filename' => $archiveStats['archive_entry_filename'],
            'uncompressed_sha256' => $archiveStats['uncompressed_sha256'],
            'archive_doc_id' => $archiveFile['doc_id'],
            'archive_filename' => $archiveFile['filename'],
            'archive_size' => $archiveFile['size'],
            'archive_mime_type' => $archiveFile['mime_type'],
        ];
    }

    private function writeArchiveRows($path, array $rows): array
    {
        $handle = fopen($path, 'wb');
        if(!$handle)
        {
            throw new \RuntimeException('Could not open archive temp file.');
        }

        $hash = hash_init('sha256');
        $count = 0;
        $firstLogId = null;
        $lastLogId = null;

        try {
            foreach($rows as $row)
            {
                $row = $this->normalizeRow($row);
                $line = $this->encodeJson($row, 0, 'log archive row');
                $line .= "\n";

                if(fwrite($handle, $line) === false)
                {
                    throw new \RuntimeException('Could not write log archive row.');
                }

                hash_update($hash, $line);
                $count++;
                $logId = isset($row['log_id']) ? $row['log_id'] : null;
                if($firstLogId === null) $firstLogId = $logId;
                $lastLogId = $logId;
            }
        } finally {
            fclose($handle);
        }

        return [
            'row_count' => $count,
            'first_log_id' => $firstLogId,
            'last_log_id' => $lastLogId,
            'uncompressed_sha256' => hash_final($hash),
        ];
    }

    private function writeZipArchive($sourcePath, $entryFilename, $zipPath): array
    {
        if(!class_exists('ZipArchive'))
        {
            throw new \RuntimeException('The PHP zip extension is required to archive logs.');
        }

        $zip = new \ZipArchive();
        $opened = $zip->open($zipPath, \ZipArchive::OVERWRITE | \ZipArchive::CREATE);
        if($opened !== true)
        {
            throw new \RuntimeException('Could not create zipped log archive.');
        }

        if(!$zip->addFile($sourcePath, $entryFilename))
        {
            $zip->close();
            throw new \RuntimeException('Could not add log data to zipped archive.');
        }

        if(!$zip->close())
        {
            throw new \RuntimeException('Could not finalize zipped log archive.');
        }

        $hash = hash_file('sha256', $zipPath);
        if($hash === false)
        {
            throw new \RuntimeException('Could not hash zipped log archive.');
        }

        return [
            'archive_format' => self::ARCHIVE_FORMAT_ZIP,
            'archive_entry_filename' => $entryFilename,
            'sha256' => $hash,
        ];
    }

    private function normalizeRow($row): array
    {
        if(is_object($row)) $row = get_object_vars($row);
        if(!is_array($row)) return ['value' => $row];
        return $row;
    }

    private function writeJsonFile($path, array $data): void
    {
        $json = $this->encodeJson($data, JSON_PRETTY_PRINT, 'log archive manifest');
        if(file_put_contents($path, $json . "\n") === false)
        {
            throw new \RuntimeException('Could not write log archive manifest.');
        }
    }

    private function storeWithFallback($path, array $filenames): array
    {
        $lastException = null;
        foreach($filenames as $filename)
        {
            try {
                return $this->storage->storeFile($path, $filename);
            } catch(\Exception $exception) {
                $lastException = $exception;
            }
        }

        if($lastException) throw $lastException;
        throw new \RuntimeException('No archive filenames were provided.');
    }

    private function countArchiveLines($contents): int
    {
        $contents = trim((string)$contents);
        if($contents === '') return 0;
        return count(explode("\n", $contents));
    }

    private function readZipEntryContents($zipContents, $entryFilename): string
    {
        if(!class_exists('ZipArchive'))
        {
            throw new \RuntimeException('The PHP zip extension is required to verify archived logs.');
        }

        $path = $this->createTempFile('epu_archive_read_');
        try {
            if(file_put_contents($path, $zipContents) === false)
            {
                throw new \RuntimeException('Could not prepare zipped archive for verification.');
            }

            $zip = new \ZipArchive();
            $opened = $zip->open($path);
            if($opened !== true)
            {
                throw new \RuntimeException('Archive file is not a readable ZIP.');
            }

            $contents = $zip->getFromName($entryFilename);
            $zip->close();
            if($contents === false)
            {
                throw new \RuntimeException('Archive ZIP does not contain the expected JSONL entry.');
            }

            return $contents;
        } finally {
            $this->removeTempFile($path);
        }
    }

    private function logArchiveRun(array $result): void
    {
        if(!method_exists($this->module, 'log')) return;

        $status = $result['status'] === self::STATUS_ERROR ? 'error' : 'info';
        if(in_array($result['status'], [self::STATUS_ARCHIVED_AND_DELETED, self::STATUS_DELETED, self::STATUS_ALREADY_DELETED]))
        {
            $status = 'success';
        }

        $parameters = [
            'status' => $status,
            'archive_status' => $result['status'],
            'archive_month' => isset($result['month']) ? $result['month'] : '',
            'archived_row_count' => intval($result['archive']['row_count'] ?? 0),
            'deleted_row_count' => intval($result['deleted_count'] ?? 0),
            'archive_doc_id' => intval($result['archive']['archive_doc_id'] ?? 0),
            'manifest_doc_id' => intval($result['archive']['manifest_doc_id'] ?? 0),
            'description' => isset($result['message']) ? $result['message'] : '',
        ];

        $this->module->log(self::LOG_MESSAGE_ARCHIVE_RUN, $parameters);
    }

    private function encodeJson($data, $flags, $description): string
    {
        if(defined('JSON_INVALID_UTF8_SUBSTITUTE'))
        {
            $flags |= JSON_INVALID_UTF8_SUBSTITUTE;
        }

        $json = json_encode($data, $flags);
        if($json === false && defined('JSON_PARTIAL_OUTPUT_ON_ERROR'))
        {
            $json = json_encode($data, $flags | JSON_PARTIAL_OUTPUT_ON_ERROR);
        }

        if($json === false)
        {
            throw new \RuntimeException("Could not encode {$description}.");
        }

        return $json;
    }

    private function createTempFile($prefix): string
    {
        $path = tempnam($this->getTempDirectory(), $prefix);
        if($path === false)
        {
            throw new \RuntimeException('Could not create archive temp file.');
        }
        return $path;
    }

    private function getTempDirectory(): string
    {
        if(defined('APP_PATH_TEMP') && is_dir(APP_PATH_TEMP))
        {
            return rtrim(APP_PATH_TEMP, DIRECTORY_SEPARATOR);
        }
        return sys_get_temp_dir();
    }

    private function removeTempFile($path): void
    {
        if($path && file_exists($path))
        {
            unlink($path);
        }
    }

    private function dateTime($value): \DateTimeImmutable
    {
        if($value instanceof \DateTimeImmutable) return $value;
        if($value instanceof \DateTimeInterface)
        {
            return new \DateTimeImmutable($value->format('Y-m-d H:i:s'), $value->getTimezone());
        }
        return new \DateTimeImmutable((string)$value);
    }

    private function formatDate($date): string
    {
        return $this->dateTime($date)->format('Y-m-d H:i:s');
    }
}
