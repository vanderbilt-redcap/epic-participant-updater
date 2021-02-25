<template>
  <div id="app">
    <b-overlay :show="loading" rounded="sm" class="loading-overlay" v-if="loading">
    </b-overlay>
    <router-view v-else/>
  </div>
</template>

<script>
import '@/init' //load all libraries
import router from '@/router'
import store from '@/store'

import {api_client} from '@/API'

export default {
  name: 'App',
  router,
  store,
  data() {
    return {
      loading: false,
    }
  },
  created() {
    this.loadSettings()
  },
  methods: {
    async loadSettings() {
      try {
        this.loading = true
        const response = await api_client.get('', {params: {route: 'settings'}})
        const {data: {app_settings, projects, api_token_data}} = response
        await this.$store.dispatch('app_settings/set', app_settings)
        await this.$store.dispatch('api_token/set', api_token_data)
        await this.$store.dispatch('projects/setList', projects)
      } catch (error) {
        console.log(error)
      }finally {
        this.loading = false
      }

    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.loading-overlay {
  min-height: 300px;
}
</style>
