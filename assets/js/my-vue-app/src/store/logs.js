import { ref, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import API from '../api/API'
import { baseURL, modulePrefix } from '../config'

export default defineStore('logs', () => {
    const api = new API(baseURL, modulePrefix)

    const normalizePositiveInteger = (value, fallback = 1) => {
        const parsed = parseInt(value, 10)
        if (Number.isNaN(parsed) || parsed < 1) return fallback
        return parsed
    }

    const logs = ref([])
    const metadata = ref({})
    
    const loading = ref(false)
    const error = ref()
    const page = ref(1)
    const perPage = ref(25)
    const query = ref('')
    const activeRequestId = ref(0)
    const total = computed(() => {
        const parsed = parseInt(metadata.value?.total ?? 0, 10)
        if (Number.isNaN(parsed) || parsed < 0) return 0
        return parsed
    })
    const totalPages = computed(() => {
        const currentPerPage = normalizePositiveInteger(perPage.value, 25)
        return Math.max(1, Math.ceil(total.value / currentPerPage))
    })

    const getList = async (_page = 1, _perPage = perPage.value, _query = query.value) => {
        const params = {
            _page,
            _per_page: _perPage,
        }
        if (_query) params.q = _query
        const response = await api.read('logs', {params})
        const data = response.data
        return data
    }

    const loadPage = async (_page=1, _perPage) => {
        const requestId = activeRequestId.value + 1
        activeRequestId.value = requestId
        loading.value = true
        const currentPage = normalizePositiveInteger(_page, 1)
        const currentPerPage = normalizePositiveInteger(_perPage ?? perPage.value, 25)
        try {
            const response = await getList(currentPage, currentPerPage, query.value)
            if (requestId !== activeRequestId.value) return
            logs.value = [...response?.data ?? []]
            metadata.value = response?.metadata ?? {}
            error.value = undefined
        } catch (exception) {
            if (requestId !== activeRequestId.value) return
            error.value = exception
        } finally {
            if (requestId === activeRequestId.value) loading.value = false
        }
    }

    const refresh = () => loadPage(page.value, perPage.value)

    const goToNextPage = () => {
        if(loading.value===true) return
        if(page.value === totalPages.value) return
        page.value = page.value + 1
    }

    const goToPrevPage = () => {
        if(loading.value===true) return
        if(page.value <= 1) return
        page.value = page.value - 1
    }

    watch([page, perPage], () => {
        loadPage(page.value, perPage.value)
    }, {immediate: true})

    watch(query, () => {
        if(page.value === 1) {
            loadPage(page.value, perPage.value)
            return
        }
        page.value = 1
    })
    
    return {
        getList,
        goToNextPage,
        goToPrevPage,
        refresh,
        error,
        loading,
        page,
        perPage,
        query,
        total,
        totalPages,
        logs,
        metadata,
    }
})
