<template>
    <div class="d-flex flex-column gap-2 mt-2">
        <div class="d-flex align-items-center gap-2 flex-wrap">
            <div class="input-group input-group-sm logs-search">
                <span class="input-group-text">
                    <i class="fas fa-search fa-fw"></i>
                </span>
                <input
                    v-model="searchText"
                    type="search"
                    class="form-control"
                    placeholder="Search logs"
                    aria-label="Search logs"
                />
                <button
                    v-if="searchText"
                    type="button"
                    class="btn btn-outline-secondary"
                    aria-label="Clear search"
                    @click="clearSearch"
                >
                    <i class="fas fa-times fa-fw"></i>
                </button>
            </div>
            <LogsPagination v-model="store.page" :per-page="store.perPage" :total-items="store.total" />
            <button type="button" class="btn btn-sm btn-primary" @click="store.refresh" :disabled="store.loading">
                <i v-if="store.loading" class="fas fa-spinner fa-spin fa-fw"></i>
                <i v-else class="fas fa-refresh fa-fw"></i>
            </button>
            <span style="font-variant-numeric: tabular-nums;">
                Page 
                <span class="number">{{ store.page }}</span>
                <span>/</span>
                <span class="number">{{ store.totalPages }}</span>
            </span>
        </div>
        <div v-if="store.error" class="alert alert-danger py-2 mb-0">
            Unable to load logs.
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>log ID</th>
                        <th>timestamp</th>
                        <th>user</th>
                        <th>IP</th>
                        <th>project ID</th>
                        <th>event ID</th>
                        <th>record</th>
                        <th>message</th>
                        <th>status</th>
                        <th>save action</th>
                        <th>Epic status</th>
                        <th>items</th>
                        <th>description</th>
                        <th>save errors</th>
                        <th>MRN</th>
                        <th>study ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="store.logs.length === 0">
                        <td colspan="16" class="text-center text-muted py-3">No logs found</td>
                    </tr>
                    <template v-for="(log, index) in store.logs" :key="log?.log_id ??  index">
                        <tr>
                            <td>{{log.log_id}}</td>
                            <td>{{log.timestamp}}</td>
                            <td>{{log.user}}</td>
                            <td>{{log.ip}}</td>
                            <td>{{log.project_id}}</td>
                            <td>{{log.event_id}}</td>
                            <td>{{log.record}}</td>
                            <td>{{log.message}}</td>
                            <td>
                                <span class="badge" :class="statusClass(log.status)">
                                    {{log.status}}
                                </span>
                            </td>
                            <td>{{log.save_action}}</td>
                            <td>{{log.epic_status}}</td>
                            <td class="number">{{log.save_item_count}}</td>
                            <td>
                                <details v-if="log.description">
                                    <summary>More...</summary>
                                    <pre>{{log.description}}</pre>
                                </details>
                            </td>
                            <td>
                                <details v-if="log.save_errors">
                                    <summary>{{ errorCountText(log) }}</summary>
                                    <pre>{{log.save_errors}}</pre>
                                </details>
                                <span v-else class="number">{{log.save_error_count}}</span>
                            </td>
                            <td>{{log.MRN}}</td>
                            <td>{{log.study_id}}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import {useLogsStore} from '../store'
import LogsPagination from '../components/LogsPagination.vue'

const store = useLogsStore()
const searchText = ref(store.query)
let searchTimeout = null

const clearSearch = () => {
    searchText.value = ''
}

const errorCountText = (log) => {
    const count = parseInt(log?.save_error_count ?? 0, 10)
    if (Number.isNaN(count) || count < 1) return 'More...'
    return count === 1 ? '1 error' : `${count} errors`
}

const statusClass = (status) => {
    const normalizedStatus = `${status ?? ''}`.toLowerCase()
    if (normalizedStatus === 'success') return 'text-bg-success'
    if (normalizedStatus === 'warning') return 'text-bg-warning'
    if (normalizedStatus === 'error') return 'text-bg-danger'
    return 'text-bg-secondary'
}

watch(searchText, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        store.query = value.trim()
    }, 250)
})

watch(() => store.query, (value) => {
    if (value !== searchText.value.trim()) searchText.value = value
})

onBeforeUnmount(() => {
    if (searchTimeout) clearTimeout(searchTimeout)
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
.logs-search {
    max-width: 24rem;
}
pre {
    max-width: 32rem;
    margin-bottom: 0;
    white-space: pre-wrap;
}
</style>
