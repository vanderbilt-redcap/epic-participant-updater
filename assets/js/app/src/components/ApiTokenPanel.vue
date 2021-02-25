<template>
  <div>
    <b-card title="Listening URL" tag="article" class="mb-2">
      <b-card-text>
        <p>Provide this URL to your Epic staff for the configuration of the EOA service.</p>
        <p>This URL will allow Hyperspace to send study enrollment data to REDCap.</p>
        <span class="small">{{visible_listening_url}}</span>
      </b-card-text>
          
      <b-button @click="show_listening_url=!show_listening_url" variant="primary" size="sm">
        <font-awesome-icon v-if="show_listening_url" :icon="['fas', 'eye-slash']" fixed-width />
        <font-awesome-icon v-else :icon="['fas', 'eye']" fixed-width />
        <span class="ml-2">Toggle</span>
      </b-button>

      <b-button @click="copyToClipboard(listening_url)" size="sm" class="ml-2" variant="primary">
        <font-awesome-icon :icon="['fas', 'copy']" fixed-width />
        <span class="ml-2">Copy to clipboard</span>
      </b-button>
    </b-card>

    <b-card title="API Token" tag="article" class="mb-2">
      <b-card-text>
        <p>Inspect or change the API token.</p>
        <span class="small">{{visible_api_token}}</span>
        
        <b-alert class="my-2" variant="warning" show>Please note that, if the API token is changed, the updated listening URL must also be changed in Hyperspace.</b-alert>

      </b-card-text>

      
      <b-button @click="show_api_token=!show_api_token" variant="primary" size="sm">
        <font-awesome-icon v-if="show_api_token" :icon="['fas', 'eye-slash']" fixed-width />
        <font-awesome-icon v-else :icon="['fas', 'eye']" fixed-width />
        <span class="ml-2">Toggle</span>
      </b-button>

      <b-button @click="copyToClipboard(api_token)" size="sm" class="ml-2" variant="primary">
        <font-awesome-icon :icon="['fas', 'copy']" fixed-width />
        <span class="ml-2">Copy to clipboard</span>
      </b-button>

      <b-button @click="confirmRefreshToken" size="sm" class="ml-2" variant="warning" :disabled="loading">
        <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin fixed-width />
        <font-awesome-icon v-else :icon="['fas', 'sync']" fixed-width />
        <span class="ml-2">Refresh API token</span>
      </b-button>
    </b-card>

  </div>
</template>

<script>
import {api_client} from '@/API'

export default {
  data() {
    return {
      loading: false,
      show_api_token: false,
      show_listening_url: false,
    }
  },
  computed: {
    listening_url_base() {
      return this.$store.state.api_token.listening_url_base
    },
    listening_url() {
      return this.$store.state.api_token.listening_url
    },
    api_token() {
      const api_token = this.$store.state.api_token.api_token
      return api_token
    },
    visible_listening_url() {
      const url = this.listening_url_base+this.api_token
      if(this.show_listening_url) return url
      else return this.listening_url_base+this.censor(this.api_token)
    },
    visible_api_token() {
      if(this.show_api_token) return this.api_token
      else return this.censor(this.api_token)
    }
  },
  methods: {
    censor(string_to_censor='') {
      return string_to_censor.replace(/./g, '*')
    },
    async copyToClipboard(text) {
      await navigator.clipboard.writeText(text)
      this.$bvToast.toast('Copied to clipboard', {
        title: 'Success',
        toaster: 'b-toaster-top-right',
        solid: false, //translucent
        autoHideDelay: 1500,
        // variant: 'light',
      })
    },
    async refreshToken() {
      try {
        this.loading = true
        const params = {
          route: 'regenerate_token'
        }
        const form_data = new FormData()
        form_data.append('api_token', this.api_token)
        const response = await api_client.post('', form_data, {params})
        const {data} = response
        await this.$store.dispatch('api_token/set', data)
      } catch (error) {
        console.log(error)
      }finally {
        this.loading = false
      }
    },
    async confirmRefreshToken() {
      const message = 'Please confirm that you want to refresh the API token. The new token must be updated in the Hyperspace configuration.'
      const confirm = await this.$bvModal.msgBoxConfirm(message, {
        title: 'Are you sure?'
      })
      if(confirm) this.refreshToken()
    }
  }
}
</script>

<style>

</style>