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

    const settings = reactive({
        api_token_data: {},
        app_settings: {},
        projects: [],
    })
    const api_token_data = ref({})

    async function init() {
        const data = await getSettings()
        console.log(data?.api_token_data)
        settings.api_token_data = api_token_data.value = data?.api_token_data ?? {}
        settings.app_settings = data?.app_settings ?? {}
        settings.projects = data?.projects ?? []
    }
    
    return {
        init,
        settings,
        api_token_data,
    }
})