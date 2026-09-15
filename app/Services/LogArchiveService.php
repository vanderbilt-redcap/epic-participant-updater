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
    const MAX_MANIFEST_BYTES = 1048576;
    // JSON escaping can expand each raw byte sixfold; keep one row, never a full expanded month.
    const MAX_JSONL_LINE_BYTES = 201327616;
    const MAX_EXPANDED_BYTES = 17179869184;

    const STATUS_ALREADY_ARCHIVED = 'already_archived';
    const STATUS_ALREADY_DELETED = 'already_deleted';
    const STATUS_ARCHIVED = 'archived';
    const STATUS_ARCHIVED_AND_DELETED = 'archived_and_deleted';
    const STATUS_ARCHIVE_FILES_DELETED = 'archive_files_deleted';
    const STATUS_DELETED = 'deleted';
    const STATUS_ERROR = 'error';
    const STATUS_NO_ELIGIBLE_LOGS = 'no_eligible_logs';
    const STATUS_NO_LOGS_IN_MONTH = 'no_logs_in_month';
    const STATUS_VERIFIED = 'verified';

    const LOG_MESSAGE_ARCHIVE_RUN = 'log archive run';
    const LOG_MESSAGE_ARCHIVE_FILES_DELETED = 'log archive files deleted';

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
        } catch(\Throwable $exception) {
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
        return $this->repository->withArchiveLock(function () use ($window) {
            return $this->archiveMonthLocked($window);
        });
    }

    private function archiveMonthLocked(array $window): array
    {
        $this->validateWindow($window);
        $month = $window['month'];
        $index = $this->getArchiveIndex();
        if(isset($index[$month]))
        {
            $this->verifyArchiveEntry($index[$month]);
            return [
                'status' => self::STATUS_ALREADY_ARCHIVED,
                'month' => $month,
                'archive' => $index[$month],
            ];
        }

        $maxLogId = $this->repository->getMaxLogIdForWindow($window['start'], $window['end']);
        $rows = $this->repository->getLogsForWindow($window['start'], $window['end'], $maxLogId);

        $jsonlPath = null;
        $archivePath = null;
        $manifestPath = null;
        $storedDocIds = [];
        $published = false;

        try {
            $jsonlPath = $this->createTempFile('epu_archive_jsonl_');
            $rowStats = $this->writeArchiveRows($jsonlPath, $rows);
            unset($rows);
            if ($rowStats['row_count'] === 0) return ['status' => self::STATUS_NO_LOGS_IN_MONTH, 'month' => $month];

            $archivePath = $this->createTempFile('epu_archive_zip_');
            $archiveStats = array_merge(
                $rowStats,
                $this->writeZipArchive($jsonlPath, "epu_logs_{$month}.jsonl", $archivePath)
            );

            $archiveFile = $this->storeWithFallback($archivePath, [
                "epu_logs_{$month}.zip",
                "epu_logs_{$month}.txt",
            ]);
            $storedDocIds[] = $archiveFile['doc_id'];

            $manifest = $this->buildManifest($window, $archiveStats, $archiveFile);
            $manifestPath = $this->createTempFile('epu_manifest_');
            $this->writeJsonFile($manifestPath, $manifest);

            $manifestFile = $this->storeWithFallback($manifestPath, [
                "epu_logs_{$month}.manifest.json",
                "epu_logs_{$month}.manifest.txt",
            ]);
            $storedDocIds[] = $manifestFile['doc_id'];

            $entry = $manifest;
            $entry['manifest_doc_id'] = $manifestFile['doc_id'];
            $entry['manifest_filename'] = $manifestFile['filename'];
            $entry['manifest_size'] = $manifestFile['size'];
            $entry['manifest_mime_type'] = $manifestFile['mime_type'];

            // An upload identifier is not proof that storage retained a complete, readable file.
            $verification = $this->verifyArchiveEntry($entry);
            $entry['verified_at'] = $verification['verified_at'];

            $index[$month] = $entry;
            $this->saveArchiveIndex($index);
            $published = true;

            return [
                'status' => self::STATUS_ARCHIVED,
                'month' => $month,
                'archive' => $entry,
            ];
        } catch (\Throwable $error) {
            // Never discard files if an uncertain settings write actually published this candidate.
            try {
                $saved = $this->getArchiveIndex();
                $published = isset($entry) && ($saved[$month]['archive_doc_id'] ?? null) === $entry['archive_doc_id'];
            } catch (\Throwable $ignored) {
                $published = true; // Retain evidence when the index itself is unavailable.
            }
            if (!$published) foreach ($storedDocIds as $docId) {
                try { $this->storage->deleteFile($docId); }
                catch (\Throwable $ignored) { /* Keep the original failure and retain the inaccessible file for investigation. */ }
            }
            throw $error;
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
        return $this->repository->withArchiveLock(function () use ($month) {
            return $this->cleanupArchivedMonthLocked($month);
        });
    }

    private function cleanupArchivedMonthLocked(string $month): array
    {
        $index = $this->getArchiveIndex();
        if(!isset($index[$month]))
        {
            throw new \RuntimeException("No archive index entry found for {$month}.");
        }

        $entry = $index[$month];
        if(isset($entry['cleanup_status']) && $entry['cleanup_status'] === self::STATUS_DELETED)
        {
            if ($this->repository->countLogsForWindow($entry['start'], $entry['end']) > 0) {
                throw new \RuntimeException('Additional active logs exist for an already archived month; they were retained for review.', 409);
            }
            return [
                'status' => self::STATUS_ALREADY_DELETED,
                'month' => $month,
                'deleted_count' => intval($entry['deleted_count'] ?? 0),
                'archive' => $entry,
            ];
        }

        $verification = $this->verifyArchiveEntry($entry);
        $remainingCount = $this->verifyCleanupCandidates($entry, $verification['max_log_id']);
        $deletedCount = $remainingCount === 0 ? 0 : $this->repository->deleteLogsForWindow($entry['start'], $entry['end'], $verification['max_log_id']);
        if($deletedCount === false)
        {
            throw new \RuntimeException('REDCap did not confirm log cleanup completed.');
        }
        if($deletedCount === null)
        {
            $deletedCount = $remainingCount;
        }
        if ($deletedCount !== $remainingCount || $this->repository->countLogsForWindow($entry['start'], $entry['end'], $verification['max_log_id']) !== 0) {
            throw new \RuntimeException('Archive cleanup was incomplete; verified files and remaining active logs were retained.');
        }

        $entry['cleanup_status'] = self::STATUS_DELETED;
        // A retry may follow a completed or partial deletion whose index update was interrupted.
        $entry['deleted_count'] = $verification['row_count'];
        $entry['deleted_at'] = $this->formatDate($this->dateTime($this->now ?: 'now'));
        $entry['verified_at'] = $verification['verified_at'];

        $index[$month] = $entry;
        $this->saveArchiveIndex($index);

        return [
            'status' => self::STATUS_DELETED,
            'month' => $month,
            'deleted_count' => $entry['deleted_count'],
            'archive' => $entry,
        ];
    }

    /**
     * Verify stored files against the index without requiring active logs to still exist.
     *
     * @param array $entry
     * @return array
     */
    public function verifyArchiveEntry(array $entry): array
    {
        $this->validateArchiveMetadata($entry);
        $archiveFile = null;
        $manifestFile = null;
        try {
            $manifestFile = $this->storage->readFile(intval($entry['manifest_doc_id'] ?? 0));
            if (!$manifestFile) throw new \RuntimeException('Could not read back archive edoc files.');
            $this->verifyManifestFile($manifestFile, $entry);
            $manifestFile->close();
            $archiveFile = $this->storage->readFile(intval($entry['archive_doc_id']));
            if (!$archiveFile) throw new \RuntimeException('Could not read back archive edoc files.');
            $rows = $this->readArchiveRows($archiveFile, $entry);
            foreach ($rows as $row) { /* Drain incrementally so all records, hashes and CRC are checked. */ }
            return array_merge($rows->getReturn(), [
                'status' => self::STATUS_VERIFIED,
                'verified_at' => $this->formatDate($this->dateTime($this->now ?: 'now')),
            ]);
        } finally {
            if ($archiveFile) $archiveFile->close();
            if ($manifestFile) $manifestFile->close();
        }
    }

    private function validateWindow(array $window): void
    {
        $month = $window['month'] ?? '';
        if (!is_string($month) || !preg_match('/^\d{4}-(0[1-9]|1[0-2])$/D', $month)) {
            throw new \InvalidArgumentException('Invalid archive month.', 400);
        }
        $start = $this->dateTime($month . '-01 00:00:00');
        if (($window['start'] ?? null) !== $this->formatDate($start) || ($window['end'] ?? null) !== $this->formatDate($start->modify('+1 month'))) {
            throw new \RuntimeException('Archive range does not match its month.');
        }
    }

    private function validateArchiveMetadata(array $entry): void
    {
        $this->validateWindow($entry);
        foreach (['row_count', 'first_log_id', 'last_log_id', 'archive_doc_id', 'archive_size', 'schema_version'] as $key) {
            if (!isset($entry[$key]) || !is_scalar($entry[$key]) || !preg_match('/^[0-9]+$/D', (string)$entry[$key]) || intval($entry[$key]) < 1) {
                throw new \RuntimeException("Archive metadata is missing or invalid: {$key}.");
            }
        }
        foreach (['max_log_id', 'uncompressed_size', 'manifest_size', 'manifest_doc_id'] as $key) {
            if (array_key_exists($key, $entry) && (!is_scalar($entry[$key]) || !preg_match('/^[0-9]+$/D', (string)$entry[$key]) || intval($entry[$key]) < 1)) {
                throw new \RuntimeException("Archive metadata is invalid: {$key}.");
            }
        }
        if (intval($entry['schema_version']) !== self::ARCHIVE_SCHEMA_VERSION || ($entry['archive_format'] ?? '') !== self::ARCHIVE_FORMAT_ZIP) {
            throw new \RuntimeException('Unsupported archive format or schema.');
        }
        foreach (['sha256', 'uncompressed_sha256'] as $key) {
            if (!is_string($entry[$key] ?? null) || !preg_match('/^[a-f0-9]{64}$/D', $entry[$key])) {
                throw new \RuntimeException('Archive metadata contains an invalid content digest.');
            }
        }
        if (($entry['archive_entry_filename'] ?? '') !== 'epu_logs_' . $entry['month'] . '.jsonl') {
            throw new \RuntimeException('Archive metadata contains an invalid ZIP entry name.');
        }
    }

    private function verifyManifestFile(LogArchiveFile $file, array $entry): void
    {
        $this->validateArchiveMetadata($entry);
        $manifest = json_decode($file->readMetadata(self::MAX_MANIFEST_BYTES), true, 32);
        if (!is_array($manifest) || json_last_error() !== JSON_ERROR_NONE) throw new \RuntimeException('Archive manifest is not valid JSON.');
        $this->validateArchiveMetadata($manifest);
        foreach (['schema_version', 'month', 'start', 'end', 'row_count', 'first_log_id', 'last_log_id', 'archive_doc_id', 'archive_size', 'sha256', 'uncompressed_sha256', 'archive_format', 'archive_entry_filename', 'max_log_id', 'uncompressed_size'] as $key) {
            if (array_key_exists($key, $entry) && (!array_key_exists($key, $manifest) || !is_scalar($manifest[$key]) || (string)$manifest[$key] !== (string)$entry[$key])) {
                throw new \RuntimeException("Archive manifest does not match index field {$key}.");
            }
        }
        if (isset($entry['manifest_size']) && $file->getSize() !== intval($entry['manifest_size'])) {
            throw new \RuntimeException('Archive manifest size does not match the index.');
        }
    }

    /** Validate the compressed file, then yield one bounded JSONL record and verify final counts/digests/CRC. */
    private function readArchiveRows(LogArchiveFile $file, array $entry): \Generator
    {
        $this->validateArchiveMetadata($entry);
        if (hash_file('sha256', $file->getPath()) !== $entry['sha256']) throw new \RuntimeException('Archive content hash does not match manifest.');
        if ($file->getSize() !== intval($entry['archive_size'])) throw new \RuntimeException('Archive file size does not match the index.');
        $zip = new \ZipArchive();
        if ($zip->open($file->getPath(), \ZipArchive::CHECKCONS) !== true) throw new \RuntimeException('Archive file is not a readable ZIP.');
        $stream = null;
        try {
            $stat = $zip->statName($entry['archive_entry_filename']);
            if ($zip->numFiles !== 1 || !$stat || $stat['size'] < 1 || $stat['size'] > self::MAX_EXPANDED_BYTES) {
                throw new \RuntimeException('Archive ZIP has unexpected entries or expanded size.');
            }
            $stream = $zip->getStream($entry['archive_entry_filename']);
            if (!$stream) throw new \RuntimeException('Archive ZIP does not contain the expected JSONL entry.');
            $hash = hash_init('sha256');
            $crc = hash_init('crc32b');
            $count = 0;
            $bytes = 0;
            $firstId = null;
            $lastId = 0;
            $maxId = 0;
            $previousTime = '';
            $line = '';
            while (!feof($stream)) {
                $chunk = fgets($stream, LogArchiveFile::IO_BYTES);
                if ($chunk === false) {
                    if (!feof($stream)) throw new \RuntimeException('Archive JSONL stream read failed.');
                    break;
                }
                $bytes += strlen($chunk);
                if ($bytes > $stat['size'] || strlen($line) + strlen($chunk) > self::MAX_JSONL_LINE_BYTES) {
                    throw new \RuntimeException('Archive expanded data exceeds the supported size.');
                }
                $this->requireMemory(strlen($line) * 2 + LogArchiveFile::IO_BYTES);
                hash_update($hash, $chunk);
                hash_update($crc, $chunk);
                $line .= $chunk;
                if (substr($line, -1) !== "\n" && !feof($stream)) continue;
                $this->requireMemory(strlen($line) * 3);
                $row = json_decode($line, true, 32);
                if (!is_array($row) || json_last_error() !== JSON_ERROR_NONE) throw new \RuntimeException('Archive contains an invalid JSONL record.');
                $line = '';
                $id = intval($row['log_id'] ?? 0);
                $timestamp = $row['timestamp'] ?? null;
                if ($id < 1 || !is_string($timestamp) || $timestamp < $entry['start'] || $timestamp >= $entry['end']
                    || $timestamp < $previousTime || ($timestamp === $previousTime && $id <= $lastId)) {
                    throw new \RuntimeException('Archive record identity, order, or date range is invalid.');
                }
                $firstId = $firstId ?? $id;
                $lastId = $id;
                $maxId = max($maxId, $id);
                $previousTime = $timestamp;
                $count++;
                if ($count > intval($entry['row_count'])) throw new \RuntimeException('Archive line count does not match manifest row count.');
                yield $row;
            }
            if ($line !== '' || $bytes !== $stat['size'] || hash_final($crc) !== sprintf('%08x', $stat['crc'])) throw new \RuntimeException('Archive ZIP entry is incomplete or its CRC does not match.');
            if (hash_final($hash) !== $entry['uncompressed_sha256']) throw new \RuntimeException('Archive JSONL content hash does not match manifest.');
            if ($count !== intval($entry['row_count']) || $firstId !== intval($entry['first_log_id']) || $lastId !== intval($entry['last_log_id'])) {
                throw new \RuntimeException('Archive line count or identities do not match the manifest.');
            }
            if ((isset($entry['max_log_id']) && $maxId !== intval($entry['max_log_id'])) || (isset($entry['uncompressed_size']) && $bytes !== intval($entry['uncompressed_size']))) {
                throw new \RuntimeException('Archive candidate boundary or expanded size does not match the manifest.');
            }
            return ['row_count' => $count, 'max_log_id' => $maxId, 'uncompressed_size' => $bytes];
        } finally {
            if (is_resource($stream)) fclose($stream);
            $zip->close();
        }
    }

    /** Every remaining candidate must occur unchanged in the verified file, including after a partial cleanup retry. */
    private function verifyCleanupCandidates(array $entry, int $maxLogId): int
    {
        $file = $this->storage->readFile(intval($entry['archive_doc_id']));
        if (!$file) throw new \RuntimeException('Could not read back archive edoc files.');
        $archived = null;
        try {
            $archived = $this->readArchiveRows($file, $entry);
            $count = 0;
            foreach ($this->repository->getLogsForWindow($entry['start'], $entry['end'], $maxLogId) as $row) {
                $key = [$row['timestamp'], intval($row['log_id'])];
                while ($archived->valid() && [$archived->current()['timestamp'], intval($archived->current()['log_id'])] < $key) $archived->next();
                if (!$archived->valid() || $this->canonicalRow($archived->current()) !== $this->canonicalRow($row)) {
                    throw new \RuntimeException('Active logs do not match the verified archive; no further rows were deleted.');
                }
                $count++;
                $archived->next();
            }
            while ($archived->valid()) $archived->next();
            return $count;
        } finally {
            unset($archived); // Close the ZIP stream before removing the owned file on exceptional paths.
            $file->close();
        }
    }

    private function canonicalRow(array $row): array
    {
        foreach ($row as $key => $value) {
            if ($value !== null && !is_scalar($value)) throw new \RuntimeException('Archive row contains an unsupported value.');
            $row[$key] = $value === null ? null : (string)$value;
        }
        ksort($row);
        return $row;
    }

    private function requireMemory(int $additionalBytes): void
    {
        $limit = trim(ini_get('memory_limit'));
        if ($limit === '' || $limit === '-1') return;
        $unit = strtolower(substr($limit, -1));
        $factors = ['k' => 1024, 'm' => 1048576, 'g' => 1073741824];
        $bytes = intval($limit) * ($factors[$unit] ?? 1);
        if (memory_get_usage(true) + $additionalBytes + 8388608 > $bytes) {
            throw new \RuntimeException('Insufficient available memory for this archive row; active logs were retained and the operation can be retried.');
        }
    }

    /**
     * Read the persisted archive index from module system settings.
     *
     * @return array
     */
    public function getArchiveIndex(): array
    {
        $raw = $this->module->readLogArchiveIndex();
        if($raw === null || $raw === '') return [];

        if(is_array($raw)) return $raw;

        $decoded = json_decode((string)$raw, true);
        if (!is_array($decoded) || json_last_error() !== JSON_ERROR_NONE) {
            throw new \RuntimeException('The log archive index is unreadable; existing archive references were retained.');
        }
        return $decoded;
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
        if ($this->getArchiveIndex() !== $index) throw new \RuntimeException('Could not confirm the archive index was saved.');
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
     * @return LogArchiveFile Caller must close the verified temporary file after delivery.
     */
    public function getArchiveFile($month, $fileType): LogArchiveFile
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
        if(empty($entry[$docIdKey]))
        {
            throw new \RuntimeException('Archive file is not indexed.', 404);
        }

        $this->validateArchiveMetadata($entry);
        $file = $this->storage->readFile(intval($entry[$docIdKey]));
        if(!$file)
        {
            throw new \RuntimeException('Archive file could not be read.', 404);
        }

        try {
            if ($fileType === 'manifest') {
                $this->verifyManifestFile($file, $entry);
            } else {
                $rows = $this->readArchiveRows($file, $entry);
                foreach ($rows as $row) { /* Complete validation before sending attachment headers. */ }
            }
            return $file;
        } catch (\Throwable $error) {
            $file->close();
            throw $error;
        }
    }

    /**
     * Delete the zip and manifest edocs for an indexed archive month.
     *
     * @param string $month
     * @return array
     */
    public function deleteArchiveFiles($month): array
    {
        return $this->repository->withArchiveLock(function () use ($month) {
            return $this->deleteArchiveFilesLocked($month);
        });
    }

    private function deleteArchiveFilesLocked(string $month): array
    {
        if(!preg_match('/^\d{4}-\d{2}$/', (string)$month))
        {
            throw new \InvalidArgumentException('Invalid archive month.', 400);
        }

        $index = $this->getArchiveIndex();
        if(!isset($index[$month]))
        {
            throw new \RuntimeException('Archive month not found.', 404);
        }

        $entry = $index[$month];
        $files = [
            'archive' => intval($entry['archive_doc_id'] ?? 0),
            'manifest' => intval($entry['manifest_doc_id'] ?? 0),
        ];

        foreach($files as $fileType => $docId)
        {
            if($docId < 1)
            {
                throw new \RuntimeException("Archive {$fileType} edoc is not indexed.", 404);
            }
        }

        $deletedDocIds = [];
        foreach($files as $fileType => $docId)
        {
            if(in_array($docId, $deletedDocIds, true)) continue;

            if(!$this->storage->deleteFile($docId))
            {
                throw new \RuntimeException("Could not delete {$fileType} edoc.");
            }

            $deletedDocIds[] = $docId;
        }

        unset($index[$month]);
        $this->saveArchiveIndex($index);

        $result = [
            'status' => self::STATUS_ARCHIVE_FILES_DELETED,
            'month' => $month,
            'deleted_file_count' => count($deletedDocIds),
            'archive_filename' => $entry['archive_filename'] ?? '',
            'manifest_filename' => $entry['manifest_filename'] ?? '',
        ];
        $this->logArchiveFilesDeleted($entry, $result);

        return $result;
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
            'max_log_id' => $archiveStats['max_log_id'],
            'uncompressed_size' => $archiveStats['uncompressed_size'],
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

    private function writeArchiveRows($path, iterable $rows): array
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
        $maxLogId = 0;
        $bytes = 0;

        try {
            foreach($rows as $row)
            {
                $row = $this->normalizeRow($row);
                $rawBytes = 0;
                foreach ($row as $value) {
                    if ($value !== null && !is_scalar($value)) throw new \RuntimeException('Archive row contains an unsupported value.');
                    $rawBytes += strlen((string)$value);
                }
                if ($rawBytes > LogArchiveLogRepository::MAX_ROW_BYTES) throw new \RuntimeException('A log row exceeds the supported archive row size.');
                $this->requireMemory($rawBytes * 8);
                $line = $this->encodeJson($row, 0, 'log archive row');
                $line .= "\n";
                $bytes += strlen($line);
                if (strlen($line) > self::MAX_JSONL_LINE_BYTES || $bytes > self::MAX_EXPANDED_BYTES) throw new \RuntimeException('Archive expanded data exceeds the supported size.');
                LogArchiveFile::requireDiskSpace(dirname($path), strlen($line));
                LogArchiveFile::writeAll($handle, $line);

                hash_update($hash, $line);
                $count++;
                $logId = isset($row['log_id']) ? $row['log_id'] : null;
                if($firstLogId === null) $firstLogId = $logId;
                $lastLogId = $logId;
                $maxLogId = max($maxLogId, intval($logId));
            }
            if (!fflush($handle)) throw new \RuntimeException('Could not flush complete log archive content.');
        } finally {
            fclose($handle);
        }

        return [
            'row_count' => $count,
            'first_log_id' => $firstLogId,
            'last_log_id' => $lastLogId,
            'max_log_id' => $maxLogId,
            'uncompressed_size' => $bytes,
            'uncompressed_sha256' => hash_final($hash),
        ];
    }

    private function writeZipArchive($sourcePath, $entryFilename, $zipPath): array
    {
        clearstatcache(true, $sourcePath);
        LogArchiveFile::requireDiskSpace(dirname($zipPath), filesize($sourcePath) + LogArchiveFile::IO_BYTES);
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
        clearstatcache(true, $zipPath);
        if (!is_file($zipPath) || filesize($zipPath) < 1 || filesize($zipPath) > LogArchiveFile::MAX_FILE_BYTES) {
            throw new \RuntimeException('Generated archive is empty or exceeds the supported size.');
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
        $json .= "\n";
        if (strlen($json) > self::MAX_MANIFEST_BYTES || file_put_contents($path, $json) !== strlen($json))
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

    private function logArchiveFilesDeleted(array $entry, array $result): void
    {
        if(!method_exists($this->module, 'log')) return;

        $this->module->log(self::LOG_MESSAGE_ARCHIVE_FILES_DELETED, [
            'status' => 'success',
            'archive_status' => $result['status'],
            'archive_month' => $result['month'],
            'archive_doc_id' => intval($entry['archive_doc_id'] ?? 0),
            'manifest_doc_id' => intval($entry['manifest_doc_id'] ?? 0),
            'deleted_file_count' => intval($result['deleted_file_count'] ?? 0),
        ]);
    }

    private function encodeJson($data, $flags, $description): string
    {
        if(defined('JSON_INVALID_UTF8_SUBSTITUTE'))
        {
            $flags |= JSON_INVALID_UTF8_SUBSTITUTE;
        }

        $json = json_encode($data, $flags);
        if($json === false)
        {
            throw new \RuntimeException("Could not encode {$description}.");
        }

        return $json;
    }

    private function createTempFile($prefix): string
    {
        $directory = LogArchiveFile::getTemporaryDirectory();
        LogArchiveFile::requireDiskSpace($directory, LogArchiveFile::IO_BYTES);
        $path = tempnam($directory, $prefix);
        if($path === false)
        {
            throw new \RuntimeException('Could not create archive temp file.');
        }
        return $path;
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
