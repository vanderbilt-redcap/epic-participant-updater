<?php namespace Vanderbilt\EpicParticipantUpdater\App\Services;

/**
 * Reads and removes External Module log rows through REDCap's log query APIs.
 */
class LogArchiveLogRepository
{
    public const MAX_ROW_BYTES = 33554432;
    private const LOCK_NAME = '.epu_log_archive';
    private $module;
    private $fields;

    /**
     * @param object $module External Module instance.
     * @param array $fields SELECT fields used for archived rows.
     */
    public function __construct($module, array $fields)
    {
        $this->module = $module;
        $this->fields = $fields;
    }

    /**
     * Return the oldest log timestamp strictly before the supplied cutoff.
     *
     * @param string $before
     * @return string|null
     */
    public function getOldestTimestampBefore($before): ?string
    {
        $result = $this->queryLogsOnPrimary(
            'SELECT timestamp WHERE timestamp < ? ORDER BY timestamp ASC LIMIT 1',
            [$before]
        );

        if($result && $row = db_fetch_assoc($result))
        {
            db_free_result($result);
            return $row['timestamp'];
        }
        if (!$result) throw new \RuntimeException('Could not find archive candidate logs.');
        db_free_result($result);
        return null;
    }

    /**
     * Stream a fixed candidate set in timestamp/id order without buffering a full result.
     * Filter oversized rows on the server, and fail if any candidate could not be exported.
     *
     * @param string $start
     * @param string $end
     * @return \Generator
     */
    public function getLogsForWindow($start, $end, ?int $maxLogId = null): \Generator
    {
        $maxLogId = $maxLogId ?? $this->getMaxLogIdForWindow($start, $end);
        $expected = $this->countLogsForWindow($start, $end, $maxLogId);
        if ($expected === 0) return;
        $lengths = [];
        foreach ($this->fields as $field) {
            $column = preg_split('/\\s+AS\\s+/i', $field)[0];
            $lengths[] = "COALESCE(OCTET_LENGTH({$column}), 0)";
        }
        $lengthExpression = implode(' + ', $lengths);
        $sql = 'SELECT ' . implode(',', $this->fields)
            . " WHERE timestamp >= ? AND timestamp < ? AND log_id <= ? AND ({$lengthExpression}) <= ?"
            . ' ORDER BY timestamp ASC, log_id ASC';
        // The framework normally buffers results. Its SQL resolver plus REDCap's unbuffered prepared
        // result keeps one bounded row live and avoids sorting the same month for every offset/page.
        $result = $this->queryLogsOnPrimary($sql, [$start, $end, $maxLogId, self::MAX_ROW_BYTES], MYSQLI_USE_RESULT);
        if (!$result) throw new \RuntimeException('Could not read archive log rows.');
        $statement = $GLOBALS['__db_last_stmt'] ?? null;
        $count = 0;
        try {
            while ($row = db_fetch_assoc($result)) {
                $count++;
                yield $row;
            }
        } finally {
            db_free_result($result);
            // Closing the prepared statement also releases unread server rows if a consumer stops early.
            if ($statement instanceof \mysqli_stmt) $statement->close();
        }
        if ($count !== $expected) {
            throw new \RuntimeException('Log rows changed or exceeded the archive row size limit; active logs were retained.');
        }
    }

    /** Freeze an inclusive identity boundary so later inserts cannot be swept into cleanup. */
    public function getMaxLogIdForWindow(string $start, string $end): int
    {
        $result = $this->queryLogsOnPrimary('SELECT MAX(log_id) AS maximum WHERE timestamp >= ? AND timestamp < ?', [$start, $end]);
        if (!$result) throw new \RuntimeException('Could not read archive candidate boundary.');
        $row = db_fetch_assoc($result);
        db_free_result($result);
        return intval($row['maximum'] ?? 0);
    }

    /** Serialize archive index mutations across cron/manual workers using a primary-connection DB lock. */
    public function withArchiveLock(callable $operation)
    {
        $sql = 'SELECT GET_LOCK(CONCAT(DATABASE(), ?), 0) AS acquired';
        $result = db_query($sql, [self::LOCK_NAME], null, MYSQLI_STORE_RESULT, true);
        if (!$result || intval(db_result($result, 0, 'acquired')) !== 1) {
            throw new \RuntimeException('Another log archive operation is running. Try again after it finishes.', 409);
        }
        try {
            return $operation();
        } finally {
            db_query('SELECT RELEASE_LOCK(CONCAT(DATABASE(), ?))', [self::LOCK_NAME], null, MYSQLI_STORE_RESULT, true);
        }
    }

    /**
     * Count hot log rows remaining for a half-open monthly window.
     *
     * @param string $start
     * @param string $end
     * @return int
     */
    public function countLogsForWindow($start, $end, ?int $maxLogId = null): int
    {
        $result = $this->queryLogsOnPrimary(
            'SELECT COUNT(*) AS total WHERE timestamp >= ? AND timestamp < ?' . ($maxLogId === null ? '' : ' AND log_id <= ?'),
            $maxLogId === null ? [$start, $end] : [$start, $end, $maxLogId]
        );

        if($result && $row = db_fetch_assoc($result))
        {
            db_free_result($result);
            return intval($row['total']);
        }

        throw new \RuntimeException('Could not count active archive candidate rows.');
    }

    /**
     * Remove hot log rows for a verified monthly archive.
     *
     * @param string $start
     * @param string $end
     * @return int|null A row count when REDCap returns one; null for boolean-only framework versions.
     */
    public function deleteLogsForWindow($start, $end, int $maxLogId): ?int
    {
        // Mention project_id so cron cleanup is not constrained to a current project context.
        $result = $this->module->removeLogs(
            'timestamp >= ? AND timestamp < ? AND log_id <= ? AND (project_id IS NULL OR project_id IS NOT NULL)',
            [$start, $end, $maxLogId]
        );

        if($result === false)
        {
            throw new \RuntimeException('REDCap did not confirm log cleanup completed.');
        }

        return is_numeric($result) ? intval($result) : null;
    }

    /** Resolve framework-owned tables/aliases while keeping candidate reads consistent with primary writes. */
    private function queryLogsOnPrimary(string $pseudoSql, array $params, int $resultMode = MYSQLI_STORE_RESULT)
    {
        return db_query($this->module->getQueryLogsSql($pseudoSql), $params, null, $resultMode, true);
    }
}
