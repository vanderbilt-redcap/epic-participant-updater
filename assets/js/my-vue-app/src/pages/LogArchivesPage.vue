<template>
    <div class="d-flex flex-column gap-2 mt-2">
        <div class="d-flex align-items-center gap-2 flex-wrap">
            <button type="button" class="btn btn-sm btn-primary" @click="store.loadList" :disabled="loading">
                <i v-if="loading" class="fas fa-spinner fa-spin fa-fw"></i>
                <i v-else class="fas fa-refresh fa-fw"></i>
            </button>
            <span style="font-variant-numeric: tabular-nums;">
                Archives
                <span class="number">{{ total }}</span>
            </span>
        </div>

        <div v-if="error" class="alert alert-danger py-2 mb-0">
            Unable to load log archives.
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
                        <th>archive file</th>
                        <th>manifest file</th>
                        <th>downloads</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="archives.length === 0">
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
                                {{ archive.cleanup_status || 'archived' }}
                            </span>
                            <div v-if="archive.deleted_at" class="text-muted small">{{ archive.deleted_at }}</div>
                        </td>
                        <td>
                            <div>{{ archive.archive_filename }}</div>
                            <div class="text-muted small">{{ formatBytes(archive.archive_size) }}</div>
                        </td>
                        <td>
                            <div>{{ archive.manifest_filename }}</div>
                            <div class="text-muted small">{{ formatBytes(archive.manifest_size) }}</div>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm" role="group" :aria-label="`Downloads for ${archive.month}`">
                                <a class="btn btn-outline-primary" :href="archive.archive_download_url">
                                    <i class="fas fa-file-archive fa-fw"></i>
                                    <span>Archive</span>
                                </a>
                                <a class="btn btn-outline-secondary" :href="archive.manifest_download_url">
                                    <i class="fas fa-file-alt fa-fw"></i>
                                    <span>Manifest</span>
                                </a>
                            </div>
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
const { archives, loading, error, total } = storeToRefs(store)

const cleanupClass = (status) => {
    if (status === 'deleted') return 'text-bg-success'
    if (status === 'already_deleted') return 'text-bg-success'
    if (status === 'error') return 'text-bg-danger'
    return 'text-bg-secondary'
}

const formatBytes = (value) => {
    const bytes = parseInt(value ?? 0, 10)
    if (Number.isNaN(bytes) || bytes < 1) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
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
.btn-group .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}
</style>
