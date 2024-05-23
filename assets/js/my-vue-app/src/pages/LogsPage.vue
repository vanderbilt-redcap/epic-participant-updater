<template>
    <div class="d-flex flex-column gap-2 mt-2">
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-primary" @click="store.goToPrevPage" :disabled="store.page<=1">
                <i class="fas fa-chevron-left fa-fw"></i>
            </button>
            <button type="button" class="btn btn-sm btn-primary" @click="store.goToNextPage" :disabled="store.page>=store.totalPages">
                <i class="fas fa-chevron-right fa-fw"></i>
            </button>
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
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                    <th>log ID</th>
                    <th>timestamp</th>
                    <th>user</th>
                    <th>IP</th>
                    <th>project ID</th>
                    <th>record</th>
                    <th>message</th>
                    <th>status</th>
                    <th>description</th>
                    <th>MRN</th>
                    <th>study ID</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(log, index) in store.logs" :key="log?.log_id ??  index">
                    <tr>
                        <td>{{log.log_id}}</td>
                        <td>{{log.timestamp}}</td>
                        <td>{{log.user}}</td>
                        <td>{{log.ip}}</td>
                        <td>{{log.project_id}}</td>
                        <td>{{log.record}}</td>
                        <td>{{log.message}}</td>
                        <td>{{log.status}}</td>
                        <td>
                            <details>
                                <summary>More...</summary>
                                <pre>{{log.description}}</pre>
                            </details>
                        </td>
                        <td>{{log.MRN}}</td>
                        <td>{{log.study_id}}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useLogsStore} from '../store'

const store = useLogsStore()
const error = ref()

</script>

<style scoped>
table thead th {
    text-transform: uppercase;
    text-wrap: nowrap;
}
.number {
    font-variant-numeric: tabular-nums;
}
</style>