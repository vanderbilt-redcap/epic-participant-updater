<?php
namespace Vanderbilt\EpicParticipantUpdater;

$page = new \HtmlPage();
$page->PrintHeaderExt();

include APP_PATH_VIEWS . 'HomeTabs.php';

class StatisticsPage
{
    public function render(): void
    {
        $incomingStats = $this->getIncomingRequestStats();
        $incomingCounts = $incomingStats['counts'];
        $incomingRequestTotal = $incomingStats['requestTotal'];
        $outgoingCounts = $this->getOutgoingRequestCounts();

        $this->renderContent($incomingCounts, $incomingRequestTotal, $outgoingCounts);
    }

    /**
     * @return array{counts: array<int,int>, requestTotal: int}
     */
    private function getIncomingRequestStats(): array
    {
        $sql = "
            SELECT p.value
            FROM redcap_external_modules_log AS l
            LEFT JOIN redcap_external_modules_log_parameters AS p
              ON l.log_id = p.log_id
            WHERE l.external_module_id IN (
                SELECT external_module_id
                FROM redcap_external_modules
                WHERE directory_prefix = 'epic_participant_updater'
            )
            AND p.name = 'description'
            AND l.message = 'checked XML'
            AND p.value LIKE 'xml checked for projects %'
        ";

        $result = db_query($sql);
        if (!$result) {
            return ['counts' => [], 'requestTotal' => 0];
        }

        $counts = [];
        $requestTotal = 0;

        while ($row = db_fetch_assoc($result)) {
            $requestTotal++;

            $idsPart = preg_replace('/^xml checked for projects\s*/', '', (string) ($row['value'] ?? ''));
            $projectIds = array_map('trim', explode(',', $idsPart));

            foreach ($projectIds as $projectId) {
                if (!is_numeric($projectId)) {
                    continue;
                }

                $numericId = (int) $projectId;
                if ($numericId <= 0) {
                    continue;
                }

                $counts[$numericId] = ($counts[$numericId] ?? 0) + 1;
            }
        }

        ksort($counts, SORT_NUMERIC);

        return ['counts' => $counts, 'requestTotal' => $requestTotal];
    }

    private function getOutgoingRequestCounts(): array
    {
        $sql = "
            SELECT project_id, COUNT(1) AS total
            FROM redcap_external_modules_log
            WHERE external_module_id IN (
                SELECT external_module_id
                FROM redcap_external_modules
                WHERE directory_prefix = 'epic_participant_updater'
            )
            AND message LIKE '%pushing payload to Epic%'
            GROUP BY project_id
        ";

        $result = db_query($sql);
        if (!$result) {
            return [];
        }

        $counts = [];

        while ($row = db_fetch_assoc($result)) {
            $projectId = (int) ($row['project_id'] ?? 0);
            if ($projectId <= 0) {
                continue;
            }

            $counts[$projectId] = (int) ($row['total'] ?? 0);
        }

        ksort($counts, SORT_NUMERIC);

        return $counts;
    }

    private function renderContent(array $incoming, int $incomingRequestTotal, array $outgoing): void
    {
        $incomingTotal = $this->getTotal($incoming);
        $outgoingTotal = $this->getTotal($outgoing);
        $activeProjects = $this->getActiveProjectCount($incoming, $outgoing);

        ?>
        <div class="container py-5">
            <div class="row mb-4">
                <div class="col-lg-8">
                    <h1 class="display-6 fw-semibold text-body-emphasis">Epic Participant Updater Statistics</h1>
                    <p class="lead text-secondary mb-0">Incoming requests from Epic and outgoing payloads initiated by the module.</p>
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-4">
                    <?php $this->renderSummaryCard('Incoming Requests', $incomingRequestTotal, 'primary', 'Unique requests received from Epic.'); ?>
                </div>
                <div class="col-md-4">
                    <?php $this->renderSummaryCard('Outgoing Requests', $outgoingTotal, 'success', 'Total payloads pushed from REDCap to Epic.'); ?>
                </div>
                <div class="col-md-4">
                    <?php $this->renderSummaryCard('Active Projects', $activeProjects, 'info', 'Projects with at least one logged request.'); ?>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-lg-6">
                    <?php $this->renderRequestCard(
                        'Incoming Requests',
                        'Epic → REDCap API calls handled by this module.',
                        $incoming,
                        $incomingTotal,
                        'primary',
                        $incomingRequestTotal
                    ); ?>
                </div>
                <div class="col-lg-6">
                    <?php $this->renderRequestCard(
                        'Outgoing Requests',
                        'Module → Epic payloads sent from REDCap.',
                        $outgoing,
                        $outgoingTotal,
                        'success'
                    ); ?>
                </div>
            </div>
        </div>
        <?php
    }

    private function renderSummaryCard(string $label, int $value, string $tone, string $description): void
    {
        $borderClass = sprintf('border-%s', $tone);
        ?>
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body border-start border-4 <?= htmlspecialchars($borderClass, ENT_QUOTES) ?> ps-4">
                <span class="text-uppercase text-secondary small fw-semibold"><?= htmlspecialchars($label) ?></span>
                <p class="display-6 fw-semibold text-body-emphasis mb-1"><?= $this->formatNumber($value) ?></p>
                <p class="text-secondary small mb-0"><?= htmlspecialchars($description) ?></p>
            </div>
        </div>
        <?php
    }

    private function renderRequestCard(string $title, string $subtitle, array $counts, int $total, string $tone, ?int $uniqueTotal = null): void
    {
        $badgeClass = sprintf('badge rounded-pill text-bg-%s', $tone);
        ?>
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h2 class="fs-5 fw-semibold text-body-emphasis mb-1"><?= htmlspecialchars($title) ?></h2>
                        <p class="text-secondary small mb-0"><?= htmlspecialchars($subtitle) ?></p>
                    </div>
                    <span class="<?= htmlspecialchars($badgeClass, ENT_QUOTES) ?>"><?= $this->formatNumber($total) ?> total</span>
                </div>

                <?php if ($uniqueTotal !== null): ?>
                    <div class="text-secondary small mb-2">Unique requests logged: <?= $this->formatNumber($uniqueTotal) ?></div>
                <?php endif; ?>

                <?php if (empty($counts)): ?>
                    <div class="alert alert-light border text-secondary mb-0">No requests logged yet.</div>
                <?php else: ?>
                    <div class="mb-3 text-secondary small">Across <?= $this->formatNumber(count($counts)) ?> projects.</div>
                    <div class="table-responsive">
                        <table class="table table-sm table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col" class="text-uppercase small text-secondary">Project ID</th>
                                    <th scope="col" class="text-uppercase small text-secondary text-end">Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($counts as $projectId => $count): ?>
                                    <tr>
                                        <td class="fw-semibold"><?= htmlspecialchars((string) $projectId) ?></td>
                                        <td class="text-end"><?= $this->formatNumber((int) $count) ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }

    private function getTotal(array $counts): int
    {
        return (int) array_sum($counts);
    }

    private function getActiveProjectCount(array $incoming, array $outgoing): int
    {
        $projectIds = array_merge(array_keys($incoming), array_keys($outgoing));
        $projectIds = array_map('intval', $projectIds);
        $projectIds = array_filter($projectIds, static fn (int $id): bool => $id > 0);

        return count(array_unique($projectIds));
    }

    private function formatNumber(int $value): string
    {
        return number_format($value);
    }
}

$analytics = new StatisticsPage();
$analytics->render();

$page->PrintFooter();
