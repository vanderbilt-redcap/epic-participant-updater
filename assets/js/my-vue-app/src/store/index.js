import { default as useAppStore } from './app'
import { default as useLogsStore } from './logs'
import { default as useLogArchivesStore } from './logArchives'


const useStore = () => {
    const appStore = useAppStore()
    const logsStore = useLogsStore()
    const logArchivesStore = useLogArchivesStore()
    const store = {
        app: appStore,
        logs: logsStore,
        logArchives: logArchivesStore,
    }
    return store
}

export { useStore as default, useAppStore, useLogsStore, useLogArchivesStore }
