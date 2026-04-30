import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import API from '../api/API'
import { baseURL, modulePrefix } from '../config'

export default defineStore('logArchives', () => {
    const api = new API(baseURL, modulePrefix)

    const archives = ref([])
    const metadata = ref({})
    const loading = ref(false)
    const error = ref()

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

    return {
        archives,
        metadata,
        loading,
        error,
        total,
        loadList,
    }
})
