import { ref, watchEffect, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import useAPI from '../api'
import API from '../api/API'
import { baseURL, modulePrefix } from '../config'



// const settingsAPI = useAPI('settings')

export default defineStore('logs', () => {
    const api = new API(baseURL, modulePrefix)

    const logs = ref([])
    const metadata = ref({})
    
    const loading = ref(false)
    const page = ref(1)
    const perPage = ref(25)
    const totalPages = computed(() => {
        return Math.ceil((metadata.value?.total ?? 0) / perPage.value)
    })

    const getList = async (_start = 0, _limit = 25) => {
        const params = {_start, _limit}
        const response = await api.read('logs', {params})
        const data = response.data
        return data
    }

    const loadPage = async (_page=1, _perPage) => {
        loading.value = true
        const currentPage = parseInt(_page)
        const _start = (currentPage - 1) * perPage.value
        const _limit = _perPage.value
        const response = await getList(_start, _limit)
        logs.value = [...response?.data ?? []]
        metadata.value = response?.metadata ?? {}
        loading.value = false
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
    
    return {
        getList,
        goToNextPage,
        goToPrevPage,
        refresh,
        loading,
        page,
        perPage,
        totalPages,
        logs,
        metadata,
    }
})