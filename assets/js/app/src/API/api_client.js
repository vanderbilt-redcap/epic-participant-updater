import axios from 'axios'
const api_client = axios.create({
  baseURL: '/api/',
  headers: {common: {'X-Requested-With': 'XMLHttpRequest'}},
  paramsSerializer: params => {
    const search_params =  new URLSearchParams()
    search_params.append('type', 'module')
    search_params.append('page', 'api')
    search_params.append('prefix', 'epic_participant_updater')

    for(let [key, value] of Object.entries(params)) {
      search_params.append(key, value)
    }
    return search_params.toString()
  }
})

export default api_client