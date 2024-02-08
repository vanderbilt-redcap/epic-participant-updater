import { default as useAppStore } from './app'


const useStore = () => {
    const appStore = useAppStore()
    const store = {
        app: appStore,
    }
    return store
}

export { useStore as default, useAppStore, }