import { default as useAppStore } from './app'
import { default as useLogsStore } from './logs'


const useStore = () => {
    const appStore = useAppStore()
    const logsStore = useLogsStore()
    const store = {
        app: appStore,
        logs: logsStore,
    }
    return store
}

export { useStore as default, useAppStore, useLogsStore }