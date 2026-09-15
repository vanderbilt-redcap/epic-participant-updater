<?php
use PHPUnit\Framework\TestCase;
use Vanderbilt\EpicParticipantUpdater\App\Services\LogArchiveService;
use Vanderbilt\EpicParticipantUpdater\App\Services\LogArchiveFile;

class LogArchiveTest extends TestCase
{
    public function testFindOldestEligibleMonthSelectsOldestCompleteMonth()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-01 00:00:00'],
            ['log_id' => 2, 'timestamp' => '2026-02-10 10:00:00'],
            ['log_id' => 3, 'timestamp' => '2026-03-02 10:00:00'],
        ]);
        $service = new LogArchiveService($module, $repository, new FakeLogArchiveStorage(), '2026-04-30 12:00:00');

        $window = $service->findOldestEligibleMonth();

        $this->assertSame('2026-01', $window['month']);
        $this->assertSame('2026-01-01 00:00:00', $window['start']);
        $this->assertSame('2026-02-01 00:00:00', $window['end']);
        $this->assertSame('2026-03-31 12:00:00', $window['eligible_before']);
        $this->assertSame('2026-01-01 00:00:00', $window['first_available_timestamp']);
        $this->assertFalse($window['is_partial_oldest_month']);
    }

    public function testFindOldestEligibleMonthReturnsNullWhenOnlyRecentLogsExist()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-03-02 10:00:00'],
        ]);
        $service = new LogArchiveService($module, $repository, new FakeLogArchiveStorage(), '2026-04-30 12:00:00');

        $this->assertNull($service->findOldestEligibleMonth());
    }

    public function testFindOldestEligibleMonthKeepsThirtyDaysAfterPreviousMonth()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-03-01 10:00:00'],
            ['log_id' => 2, 'timestamp' => '2026-04-02 10:00:00'],
        ]);
        $service = new LogArchiveService($module, $repository, new FakeLogArchiveStorage(), '2026-04-03 00:00:00');

        $this->assertNull($service->findOldestEligibleMonth());

        $service = new LogArchiveService($module, $repository, new FakeLogArchiveStorage(), '2026-05-01 00:00:00');
        $window = $service->findOldestEligibleMonth();

        $this->assertSame('2026-03', $window['month']);
        $this->assertSame('2026-04-01 00:00:00', $window['end']);
        $this->assertSame('2026-04-01 00:00:00', $window['eligible_before']);
    }

    public function testFindOldestEligibleMonthAllowsPartialOldestMonth()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00'],
            ['log_id' => 2, 'timestamp' => '2026-02-10 10:00:00'],
            ['log_id' => 3, 'timestamp' => '2026-03-02 10:00:00'],
        ]);
        $service = new LogArchiveService($module, $repository, new FakeLogArchiveStorage(), '2026-04-30 12:00:00');

        $window = $service->findOldestEligibleMonth();

        $this->assertSame('2026-01', $window['month']);
        $this->assertSame('2026-01-01 00:00:00', $window['start']);
        $this->assertSame('2026-02-01 00:00:00', $window['end']);
        $this->assertSame('2026-01-15 10:00:00', $window['first_available_timestamp']);
        $this->assertTrue($window['is_partial_oldest_month']);
    }

    public function testArchiveOldestEligibleMonthStoresArchiveManifestAndIndex()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
            ['log_id' => 2, 'timestamp' => '2026-01-20 11:00:00', 'message' => 'second'],
            ['log_id' => 3, 'timestamp' => '2026-03-02 10:00:00', 'message' => 'recent'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');

        $result = $service->archiveOldestEligibleMonth();

        $this->assertSame('archived', $result['status']);
        $this->assertSame('2026-01', $result['month']);
        $this->assertCount(2, $storage->files);

        $archiveFile = $storage->files[1];
        $manifestFile = $storage->files[2];
        $this->assertSame('epu_logs_2026-01.zip', $archiveFile['filename']);
        $this->assertSame('epu_logs_2026-01.manifest.json', $manifestFile['filename']);

        $manifest = json_decode($manifestFile['contents'], true);
        $this->assertSame('zip', $manifest['archive_format']);
        $this->assertSame('epu_logs_2026-01.jsonl', $manifest['archive_entry_filename']);
        $this->assertSame(hash('sha256', $archiveFile['contents']), $manifest['sha256']);

        $archiveContents = self::readZipEntry($archiveFile['contents'], $manifest['archive_entry_filename']);
        $archiveLines = array_filter(explode("\n", trim($archiveContents)));
        $this->assertCount(2, $archiveLines);
        $firstRow = json_decode($archiveLines[0], true);
        $this->assertSame(1, $firstRow['log_id']);
        $this->assertSame('first', $firstRow['message']);
        $this->assertSame(hash('sha256', $archiveContents), $manifest['uncompressed_sha256']);

        $this->assertSame(1, $manifest['schema_version']);
        $this->assertSame('2026-01', $manifest['month']);
        $this->assertSame(2, $manifest['row_count']);
        $this->assertSame(1, $manifest['archive_doc_id']);
        $this->assertTrue($manifest['is_partial_oldest_month']);

        $index = json_decode($module->settings[LogArchiveService::ARCHIVE_INDEX_SETTING], true);
        $this->assertArrayHasKey('2026-01', $index);
        $this->assertSame(1, $index['2026-01']['archive_doc_id']);
        $this->assertSame(2, $index['2026-01']['manifest_doc_id']);
        $this->assertSame(2, $index['2026-01']['row_count']);
    }

    public function testArchiveMonthDoesNotDuplicateExistingIndexEntry()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');

        $service->archiveOldestEligibleMonth();
        $result = $service->archiveOldestEligibleMonth();

        $this->assertSame('already_archived', $result['status']);
        $this->assertCount(2, $storage->files);
    }

    public function testArchiveAndCleanupDeletesOnlyAfterVerification()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
            ['log_id' => 2, 'timestamp' => '2026-01-20 11:00:00', 'message' => 'second'],
            ['log_id' => 3, 'timestamp' => '2026-03-02 10:00:00', 'message' => 'recent'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');

        $result = $service->archiveAndCleanupOldestEligibleMonth();

        $this->assertSame('archived_and_deleted', $result['status']);
        $this->assertSame(2, $result['deleted_count']);
        $this->assertSame([
            ['start' => '2026-01-01 00:00:00', 'end' => '2026-02-01 00:00:00'],
        ], $repository->deletedWindows);
        $this->assertCount(1, $repository->rows);
        $this->assertSame('recent', $repository->rows[0]['message']);

        $index = json_decode($module->settings[LogArchiveService::ARCHIVE_INDEX_SETTING], true);
        $this->assertSame('deleted', $index['2026-01']['cleanup_status']);
        $this->assertSame(2, $index['2026-01']['deleted_count']);
        $this->assertCount(1, $module->logs);
        $this->assertSame(LogArchiveService::LOG_MESSAGE_ARCHIVE_RUN, $module->logs[0]['message']);
        $this->assertSame('success', $module->logs[0]['parameters']['status']);
    }

    public function testCleanupUsesVerifiedRowCountWhenFrameworkDoesNotReturnDeleteCount()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
            ['log_id' => 2, 'timestamp' => '2026-01-20 11:00:00', 'message' => 'second'],
        ]);
        $repository->useDeleteReturnOverride = true;
        $repository->deleteReturnValue = null;
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');

        $result = $service->archiveAndCleanupOldestEligibleMonth();

        $this->assertSame('archived_and_deleted', $result['status']);
        $this->assertSame(2, $result['deleted_count']);
        $this->assertCount(0, $repository->rows);

        $index = json_decode($module->settings[LogArchiveService::ARCHIVE_INDEX_SETTING], true);
        $this->assertSame(2, $index['2026-01']['deleted_count']);
    }

    public function testCleanupDoesNotDeleteWhenArchiveReadbackFails()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
            ['log_id' => 2, 'timestamp' => '2026-01-20 11:00:00', 'message' => 'second'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');
        $service->archiveOldestEligibleMonth();
        $storage->files[1]['contents'] = $storage->files[1]['contents'] . "tampered\n";

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Archive content hash does not match manifest.');

        try {
            $service->cleanupArchivedMonth('2026-01');
        } finally {
            $this->assertCount(0, $repository->deletedWindows);
            $this->assertCount(2, $repository->rows);
        }
    }

    public function testArchiveAndCleanupLogsFailureWithoutDeleting()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $storage->failReadDocIds[] = 1;
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');

        $result = $service->archiveAndCleanupOldestEligibleMonth();

        $this->assertSame('error', $result['status']);
        $this->assertSame('Could not read back archive edoc files.', $result['message']);
        $this->assertCount(0, $repository->deletedWindows);
        $this->assertCount(1, $repository->rows);
        $this->assertCount(1, $module->logs);
        $this->assertSame('error', $module->logs[0]['parameters']['status']);
    }

    public function testArchiveAndCleanupDoesNotMarkDeletedWhenCleanupIsNotConfirmed()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
        ]);
        $repository->failDeleteBeforeDeleting = true;
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');

        $result = $service->archiveAndCleanupOldestEligibleMonth();

        $this->assertSame('error', $result['status']);
        $this->assertSame('REDCap did not confirm log cleanup completed.', $result['message']);
        $this->assertCount(1, $repository->rows);

        $index = json_decode($module->settings[LogArchiveService::ARCHIVE_INDEX_SETTING], true);
        $this->assertArrayNotHasKey('cleanup_status', $index['2026-01']);
        $this->assertSame('error', $module->logs[0]['parameters']['status']);
    }

    public function testArchiveListDoesNotExposeEdocIds()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');
        $service->archiveAndCleanupOldestEligibleMonth();

        $archives = $service->getArchiveList();

        $this->assertCount(1, $archives);
        $this->assertSame('2026-01', $archives[0]['month']);
        $this->assertSame('epu_logs_2026-01.zip', $archives[0]['archive_filename']);
        $this->assertSame('epu_logs_2026-01.manifest.json', $archives[0]['manifest_filename']);
        $this->assertSame(1, $archives[0]['row_count']);
        $this->assertArrayNotHasKey('archive_doc_id', $archives[0]);
        $this->assertArrayNotHasKey('manifest_doc_id', $archives[0]);
    }

    public function testArchiveFileDownloadIsResolvedFromIndex()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');
        $service->archiveOldestEligibleMonth();

        $archiveFile = $service->getArchiveFile('2026-01', 'archive');
        $manifestFile = $service->getArchiveFile('2026-01', 'manifest');

        $this->assertSame('epu_logs_2026-01.zip', $archiveFile->getFilename());
        $this->assertSame('application/zip', $archiveFile->getMimeType());
        $this->assertSame('epu_logs_2026-01.manifest.json', $manifestFile->getFilename());
        $this->assertSame('text/plain', $manifestFile->getMimeType());

        $manifest = json_decode($manifestFile->readMetadata(LogArchiveService::MAX_MANIFEST_BYTES), true);
        $archiveContents = self::readZipEntry(file_get_contents($archiveFile->getPath()), $manifest['archive_entry_filename']);
        $this->assertStringContainsString('"message":"first"', $archiveContents);
        $archiveFile->close();
        $manifestFile->close();
    }

    public function testArchiveFileDownloadRejectsUnindexedRequests()
    {
        $module = new FakeLogArchiveModule();
        $service = new LogArchiveService($module, new FakeLogArchiveRepository([]), new FakeLogArchiveStorage(), '2026-04-30 12:00:00');

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Archive month not found.');

        $service->getArchiveFile('2026-01', 'archive');
    }

    public function testDeleteArchiveFilesDeletesArchiveAndManifestAndRemovesIndex()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');
        $service->archiveOldestEligibleMonth();

        $result = $service->deleteArchiveFiles('2026-01');

        $this->assertSame(LogArchiveService::STATUS_ARCHIVE_FILES_DELETED, $result['status']);
        $this->assertSame(2, $result['deleted_file_count']);
        $this->assertSame([1, 2], $storage->deletedDocIds);
        $this->assertSame([], $storage->files);
        $this->assertSame([], json_decode($module->settings[LogArchiveService::ARCHIVE_INDEX_SETTING], true));
        $this->assertCount(1, $module->logs);
        $this->assertSame(LogArchiveService::LOG_MESSAGE_ARCHIVE_FILES_DELETED, $module->logs[0]['message']);
        $this->assertSame('success', $module->logs[0]['parameters']['status']);
    }

    public function testDeleteArchiveFilesKeepsIndexWhenEdocDeleteFails()
    {
        $module = new FakeLogArchiveModule();
        $repository = new FakeLogArchiveRepository([
            ['log_id' => 1, 'timestamp' => '2026-01-15 10:00:00', 'message' => 'first'],
        ]);
        $storage = new FakeLogArchiveStorage();
        $service = new LogArchiveService($module, $repository, $storage, '2026-04-30 12:00:00');
        $service->archiveOldestEligibleMonth();
        $storage->failDeleteDocIds[] = 1;

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Could not delete archive edoc.');

        try {
            $service->deleteArchiveFiles('2026-01');
        } finally {
            $index = json_decode($module->settings[LogArchiveService::ARCHIVE_INDEX_SETTING], true);
            $this->assertArrayHasKey('2026-01', $index);
            $this->assertCount(2, $storage->files);
            $this->assertSame([], $storage->deletedDocIds);
        }
    }

    private static function readZipEntry($contents, $entryName)
    {
        $path = tempnam(sys_get_temp_dir(), 'epu_test_zip_');
        file_put_contents($path, $contents);

        $zip = new ZipArchive();
        $opened = $zip->open($path);
        if($opened !== true)
        {
            unlink($path);
            throw new RuntimeException('Could not open test ZIP.');
        }

        $entryContents = $zip->getFromName($entryName);
        $zip->close();
        unlink($path);

        if($entryContents === false)
        {
            throw new RuntimeException('Could not read test ZIP entry.');
        }

        return $entryContents;
    }
}

class FakeLogArchiveModule
{
    public $settings = [];
    public $logs = [];

    public function readLogArchiveIndex() { return $this->getSystemSetting(LogArchiveService::ARCHIVE_INDEX_SETTING); }

    public function getSystemSetting($key)
    {
        return isset($this->settings[$key]) ? $this->settings[$key] : null;
    }

    public function setSystemSetting($key, $value)
    {
        $this->settings[$key] = $value;
    }

    public function log($message, $parameters = [])
    {
        $this->logs[] = [
            'message' => $message,
            'parameters' => $parameters,
        ];
    }
}

class FakeLogArchiveRepository
{
    public $rows;
    public $deletedWindows = [];
    public $useDeleteReturnOverride = false;
    public $deleteReturnValue;
    public $failDeleteBeforeDeleting = false;

    public function __construct($rows)
    {
        $this->rows = $rows;
        usort($this->rows, function($a, $b) {
            if($a['timestamp'] === $b['timestamp'])
            {
                return intval($a['log_id']) - intval($b['log_id']);
            }
            return strcmp($a['timestamp'], $b['timestamp']);
        });
    }

    public function getOldestTimestampBefore($before)
    {
        foreach($this->rows as $row)
        {
            if($row['timestamp'] < $before)
            {
                return $row['timestamp'];
            }
        }
        return null;
    }

    public function getLogsForWindow($start, $end, $maxLogId = null)
    {
        $matches = [];
        foreach($this->rows as $row)
        {
            if($row['timestamp'] >= $start && $row['timestamp'] < $end && ($maxLogId === null || $row['log_id'] <= $maxLogId))
            {
                $matches[] = $row;
            }
        }
        return $matches;
    }

    public function getMaxLogIdForWindow($start, $end)
    {
        return max(array_merge([0], array_column($this->getLogsForWindow($start, $end), 'log_id')));
    }

    public function withArchiveLock(callable $operation) { return $operation(); }

    public function countLogsForWindow($start, $end, $maxLogId = null)
    {
        return count($this->getLogsForWindow($start, $end, $maxLogId));
    }

    public function deleteLogsForWindow($start, $end, $maxLogId = null)
    {
        if($this->failDeleteBeforeDeleting)
        {
            return false;
        }

        $deleted = 0;
        $kept = [];
        foreach($this->rows as $row)
        {
            if($row['timestamp'] >= $start && $row['timestamp'] < $end && ($maxLogId === null || $row['log_id'] <= $maxLogId))
            {
                $deleted++;
                continue;
            }
            $kept[] = $row;
        }
        $this->rows = $kept;
        $this->deletedWindows[] = ['start' => $start, 'end' => $end];
        if($this->useDeleteReturnOverride)
        {
            return $this->deleteReturnValue;
        }
        return $deleted;
    }
}

class FakeLogArchiveStorage
{
    public $files = [];
    public $failReadDocIds = [];
    public $failDeleteDocIds = [];
    public $deletedDocIds = [];
    private $nextDocId = 1;

    public function storeFile($sourcePath, $downloadName)
    {
        $docId = $this->nextDocId++;
        $contents = file_get_contents($sourcePath);
        $mimeType = substr($downloadName, -4) === '.zip' ? 'application/zip' : 'text/plain';
        $this->files[$docId] = [
            'doc_id' => $docId,
            'filename' => $downloadName,
            'contents' => $contents,
            'size' => strlen($contents),
            'mime_type' => $mimeType,
        ];

        return [
            'doc_id' => $docId,
            'filename' => $downloadName,
            'size' => strlen($contents),
            'mime_type' => $mimeType,
        ];
    }

    public function readFile($docId)
    {
        if(in_array($docId, $this->failReadDocIds))
        {
            return false;
        }

        if (!isset($this->files[$docId])) return false;
        $file = $this->files[$docId];
        $owned = LogArchiveFile::create($file['filename'], $file['mime_type']);
        file_put_contents($owned->getPath(), $file['contents']);
        return $owned;
    }

    public function deleteFile($docId)
    {
        $docId = intval($docId);
        if(in_array($docId, $this->failDeleteDocIds, true))
        {
            return false;
        }
        if(!isset($this->files[$docId]))
        {
            return false;
        }

        unset($this->files[$docId]);
        $this->deletedDocIds[] = $docId;
        return true;
    }
}
