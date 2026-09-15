<template>
    <div class="d-flex flex-column gap-2 mt-2">
        <div class="d-flex align-items-center gap-2 flex-wrap">
            <button type="button" class="btn btn-sm btn-primary" aria-label="Refresh archives" @click="store.loadList" :disabled="loading">
                <i v-if="loading" class="fas fa-spinner fa-spin fa-fw"></i>
                <i v-else class="fas fa-refresh fa-fw"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger action-button" @click="forceCleanup" :disabled="runningCleanup || loading">
                <i v-if="runningCleanup" class="fas fa-spinner fa-spin fa-fw"></i>
                <i v-else class="fas fa-broom fa-fw"></i>
                <span>Force cleanup</span>
            </button>
            <span style="font-variant-numeric: tabular-nums;">
                Archives
                <span class="number">{{ total }}</span>
            </span>
        </div>

        <div v-if="error" class="alert alert-danger py-2 mb-0">
            Unable to load log archives.
        </div>
        <div v-if="actionMessage" class="alert py-2 mb-0" :class="actionError ? 'alert-danger' : 'alert-info'">
            {{ actionMessage }}
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>month</th>
                        <th>range</th>
                        <th>rows</th>
                        <th>created</th>
                        <th>cleanup</th>
                        <th>ZIP file</th>
                        <th>Manifest</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading && archives.length === 0">
                        <td colspan="8" class="text-center text-muted py-3">Loading archives…</td>
                    </tr>
                    <tr v-else-if="!error && archives.length === 0">
                        <td colspan="8" class="text-center text-muted py-3">No log archives found</td>
                    </tr>
                    <tr v-for="archive in archives" :key="archive.month">
                        <td>
                            <span class="number">{{ archive.month }}</span>
                            <span v-if="archive.is_partial_oldest_month" class="badge text-bg-secondary ms-1">partial</span>
                        </td>
                        <td>
                            <div class="archive-range">
                                <span>{{ archive.start }}</span>
                                <span>{{ archive.end }}</span>
                            </div>
                        </td>
                        <td class="number">{{ archive.row_count }}</td>
                        <td>{{ archive.created_at }}</td>
                        <td>
                            <span class="badge" :class="cleanupClass(archive.cleanup_status)">
                                {{ cleanupLabel(archive.cleanup_status) }}
                            </span>
                            <div v-if="archive.deleted_at" class="text-muted small">{{ archive.deleted_at }}</div>
                        </td>
                        <td>
                            <a
                                class="file-download"
                                :href="archive.archive_download_url"
                                :aria-label="`Download ZIP archive for ${archive.month}`"
                                :title="`Download ZIP archive for ${archive.month}`"
                            >
                                <i class="fas fa-download fa-fw"></i>
                                <span>{{ archive.archive_filename }}</span>
                            </a>
                            <div class="text-muted small">{{ formatBytes(archive.archive_size) }}</div>
                        </td>
                        <td>
                            <a
                                class="file-download"
                                :href="archive.manifest_download_url"
                                :aria-label="`Download manifest for ${archive.month}`"
                                :title="`Download manifest for ${archive.month}`"
                            >
                                <i class="fas fa-download fa-fw"></i>
                                <span>{{ archive.manifest_filename }}</span>
                            </a>
                            <div class="text-muted small">{{ formatBytes(archive.manifest_size) }}</div>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-outline-danger action-button" @click="confirmDelete(archive)" :disabled="deletingMonth === archive.month || runningCleanup">
                                <i v-if="deletingMonth === archive.month" class="fas fa-spinner fa-spin fa-fw"></i>
                                <i v-else class="fas fa-trash fa-fw"></i>
                                <span>Delete</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLogArchivesStore } from '../store'

const store = useLogArchivesStore()
const { archives, loading, runningCleanup, deletingMonth, error, actionError, actionMessage, total } = storeToRefs(store)

const cleanupClass = (status) => {
    if (status === 'deleted') return 'text-bg-success'
    if (status === 'already_deleted') return 'text-bg-success'
    if (status === 'error') return 'text-bg-danger'
    return 'text-bg-secondary'
}

// Cleanup removes active rows; the downloadable archive remains available.
const cleanupLabel = (status) => {
    if (status === 'deleted' || status === 'already_deleted') return 'Active logs removed'
    if (status === 'error') return 'Cleanup failed'
    return 'Archived'
}

const formatBytes = (value) => {
    const bytes = parseInt(value ?? 0, 10)
    if (Number.isNaN(bytes) || bytes < 1) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const forceCleanup = async () => {
    const confirmed = window.confirm(
        'Run log archive cleanup now?\n\nThis will archive the oldest eligible log month, verify the stored ZIP and manifest, then delete those archived rows from the active logs table.'
    )
    if (!confirmed) return
    try {
        await store.runCleanup()
    } catch {
        return
    }
}

const confirmDelete = async (archive) => {
    if (!window.confirm(`Delete archive and manifest files for ${archive.month}? This cannot be undone.`)) return
    try {
        await store.deleteArchive(archive.month)
    } catch {
        return
    }
}

onMounted(() => {
    store.loadList()
})
</script>

<style scoped>
table thead th {
    text-transform: uppercase;
    text-wrap: nowrap;
}
.number {
    font-variant-numeric: tabular-nums;
}
.archive-range {
    display: grid;
    gap: 0.125rem;
    font-variant-numeric: tabular-nums;
    min-width: 11rem;
}
.file-download,
.action-button {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}
.file-download {
    max-width: 20rem;
}
.file-download span {
    overflow-wrap: anywhere;
}
</style>
