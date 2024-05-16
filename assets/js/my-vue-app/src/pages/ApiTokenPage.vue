<template>
    <div class="d-flex flex-column gap-2 mt-2">
        <div class="d-flex flex-column gap-2 border rounded p-2">
            <span class="fs-3">Upload URL</span>
            <span class="d-block">This URL is used to send updates to Epic.</span>
            <div class="input-group">
                <input type="text" class="form-control" disabled readonly :value="epic_upload_url" />
                <button class="btn btn-outline-secondary" type="button" @click="onCopyUploadURLClicked"><i class="fas fa-copy"></i></button>
            </div>
        </div>

        <div class="d-flex flex-column gap-2 border rounded p-2">
            <span class="fs-3">Listening URL</span>
            <span class="d-block">Provide this URL to your Epic staff for the configuration of the EOA service.</span>
            <span class="d-block">This URL will allow Hyperspace to send study enrollment data to REDCap.</span>
            <div class="input-group">
                <input type="text" class="form-control" disabled readonly :value="urlToggler.value.value" />
                <button class="btn btn-outline-secondary" type="button" @click="onCopyListeningURLClicked"><i class="fas fa-copy"></i></button>
                <button class="btn btn-outline-secondary" type="button" @click="urlToggler.toggle"><i class="fas fa-eye"></i></button>
            </div>
        </div>
        
        <div class="d-flex flex-column gap-2 border rounded p-2">
            <span class="fs-3">API Token</span>
            <span>Inspect or change the API token</span>
            <div class="input-group">
                <input type="text" class="form-control" disabled readonly :value="tokenToggler.value.value" />
                <button class="btn btn-outline-secondary" type="button" @click="onCopyApiTokenClicked"><i class="fas fa-copy"></i></button>
                <button class="btn btn-outline-secondary" type="button" @click="tokenToggler.toggle"><i class="fas fa-eye"></i></button>
            </div>

            <div class="alert alert-warning mb-0">
                <span>Please note that, if the API token is changed, the updated listening URL must also be changed in Hyperspace</span>
            </div>
            <div>
                <button class="btn btn-sm btn-danger" @click="onRegenerateApiTokenClicked">
                    <span class="d-flex gap-2 align-items-center">
                        <i class="fas fa-refresh"></i>
                        <span>Regenerate token</span>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {useAppStore} from '../store'
import {useClipboard} from '../utils'

const store = useAppStore()
const clipboard = useClipboard()

const useToggler = (secret) => {
  const show = ref(false)

  const toggle = () => {
    show.value = !show.value
  }

  const value = computed(() => {
    return show.value ? secret.value : '*******'
  })

  return {
    toggle,
    value
  }
}

const api_token = computed(() => store?.api_token_data?.api_token)
const tokenToggler = useToggler(api_token)

const listening_url = computed(() => store?.api_token_data?.listening_url)
const urlToggler = useToggler(listening_url)

const epic_upload_url = computed(() => store?.epic_upload_url)

async function onCopyApiTokenClicked() {
    await clipboard.copy(store?.api_token_data?.api_token)
    alert('text copied')
}
async function onCopyListeningURLClicked() {
    await clipboard.copy(store?.api_token_data?.listening_url)
    alert('text copied')
}
async function onCopyUploadURLClicked() {
    await clipboard.copy(store?.epic_upload_url)
    alert('text copied')
}

async function onRegenerateApiTokenClicked() {
    const confirmed = confirm('Are you sure you want to generate a new API token?')
    if(!confirmed) return
    const response = await store.regenerateToken()
    store.init()
}

</script>

<style scoped>

</style>