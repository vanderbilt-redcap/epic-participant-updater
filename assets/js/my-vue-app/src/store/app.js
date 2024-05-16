import { ref, reactive } from 'vue'
import {defineStore} from 'pinia'
import useAPI from '../api'
import API from '../api/API'
import { baseURL, modulePrefix } from '../config'



// const settingsAPI = useAPI('settings')

export default defineStore('settings', () => {
    const api = new API(baseURL, modulePrefix)

    const getSettings = async () => {
        const response = await api.read('settings')
        const data = response.data
        return data
    }

    const regenerateToken = async() => {
        const response = await api.create('regenerate_token')
        return response
    }

    const api_token_data = ref({})
    const app_settings = ref({})
    const projects = ref([])
    const epic_upload_url = ref('')

    async function init() {
        const data = await getSettings()
        api_token_data.value = data?.api_token_data ?? {}
        app_settings.value = data?.app_settings ?? {}
        projects.value = data?.projects ?? []
        epic_upload_url.value = data?.epic_upload_url ?? ''
    }
    
    return {
        init,
        regenerateToken,
        api_token_data,
        app_settings,
        projects,
        epic_upload_url,
    }
})