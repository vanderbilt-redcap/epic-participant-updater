import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import API from '../api/API'
import { baseURL, modulePrefix } from '../config'

export default defineStore('logArchives', () => {
    const api = new API(baseURL, modulePrefix)

    const archives = ref([])
    const metadata = ref({})
    const loading = ref(false)
    const runningCleanup = ref(false)
    const deletingMonth = ref('')
    const error = ref()
    const actionError = ref()
    const actionMessage = ref('')

    const total = computed(() => {
        const parsed = parseInt(metadata.value?.total ?? archives.value.length, 10)
        if (Number.isNaN(parsed) || parsed < 0) return 0
        return parsed
    })

    const loadList = async () => {
        loading.value = true
        try {
            const response = await api.read('archives')
            archives.value = [...response.data?.data ?? []]
            metadata.value = response.data?.metadata ?? {}
            error.value = undefined
        } catch (exception) {
            error.value = exception
        } finally {
            loading.value = false
        }
    }

    const runCleanup = async () => {
        runningCleanup.value = true
        actionError.value = undefined
        actionMessage.value = ''
        try {
            const response = await api.create('archives/run-cleanup', {})
            actionMessage.value = response.data?.message ?? 'Log archive cleanup completed.'
            return response.data
        } catch (exception) {
            actionError.value = exception
            actionMessage.value = exception.response?.data?.message ?? 'Unable to run log archive cleanup.'
            throw exception
        } finally {
            await loadList()
            runningCleanup.value = false
        }
    }

    const deleteArchive = async (month) => {
        deletingMonth.value = month
        actionError.value = undefined
        actionMessage.value = ''
        try {
            const response = await api.delete('archives', month)
            actionMessage.value = `Deleted archive files for ${month}.`
            return response.data
        } catch (exception) {
            actionError.value = exception
            actionMessage.value = exception.response?.data?.message ?? `Unable to delete archive files for ${month}.`
            throw exception
        } finally {
            await loadList()
            deletingMonth.value = ''
        }
    }

    return {
        archives,
        metadata,
        loading,
        runningCleanup,
        deletingMonth,
        error,
        actionError,
        actionMessage,
        total,
        loadList,
        runCleanup,
        deleteArchive,
    }
})
