<?php namespace Vanderbilt\EpicParticipantUpdater\App\Services;

/**
 * Reads and removes External Module log rows through REDCap's log query APIs.
 */
class LogArchiveLogRepository
{
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
        $result = $this->module->queryLogs(
            'SELECT timestamp WHERE timestamp < ? ORDER BY timestamp ASC LIMIT 1',
            [$before]
        );

        if($result && $row = db_fetch_assoc($result))
        {
            return $row['timestamp'];
        }

        return null;
    }

    /**
     * Fetch all archive fields for a half-open monthly log window.
     *
     * @param string $start
     * @param string $end
     * @return array
     */
    public function getLogsForWindow($start, $end): array
    {
        $query = 'SELECT ' . implode(',', $this->fields)
            . ' WHERE timestamp >= ? AND timestamp < ? ORDER BY timestamp ASC, log_id ASC';
        $result = $this->module->queryLogs($query, [$start, $end]);

        $logs = [];
        while($result && $row = db_fetch_assoc($result))
        {
            $logs[] = $row;
        }

        return $logs;
    }

    /**
     * Count hot log rows remaining for a half-open monthly window.
     *
     * @param string $start
     * @param string $end
     * @return int
     */
    public function countLogsForWindow($start, $end): int
    {
        $result = $this->module->queryLogs(
            'SELECT COUNT(*) AS total WHERE timestamp >= ? AND timestamp < ?',
            [$start, $end]
        );

        if($result && $row = db_fetch_assoc($result))
        {
            return intval($row['total']);
        }

        return 0;
    }

    /**
     * Remove hot log rows for a verified monthly archive.
     *
     * @param string $start
     * @param string $end
     * @return int|null A row count when REDCap returns one; null for boolean-only framework versions.
     */
    public function deleteLogsForWindow($start, $end): ?int
    {
        // Mention project_id so cron cleanup is not constrained to a current project context.
        $result = $this->module->removeLogs(
            'timestamp >= ? AND timestamp < ? AND (project_id IS NULL OR project_id IS NOT NULL)',
            [$start, $end]
        );

        if($result === false)
        {
            throw new \RuntimeException('REDCap did not confirm log cleanup completed.');
        }

        return is_numeric($result) ? intval($result) : null;
    }
}
