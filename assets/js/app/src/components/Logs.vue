<template>
<div>
  <b-pagination
    v-model="current_page"
    :total-rows="total"
    :per-page="per_page"
    size="sm"
    class="my-2"
  ></b-pagination>

  <b-table striped hover bordered :items="logs" small :busy="loading">
    <template #cell(description)="data">
      <div v-if="data.value.length>100">
        <b-button size="sm" @click="info(data.value, data.item.log_id, $event.target)" class="mr-1">Show details</b-button>
      </div>
      <div v-else>
        {{data.value}}
      </div>
    </template>
  </b-table>

  <b-pagination
    v-model="current_page"
    :total-rows="total"
    :per-page="per_page"
    size="sm"
    class="my-2"
  ></b-pagination>

  <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" size="xl">
    <pre>{{ infoModal.content }}</pre>
  </b-modal>

</div>
</template>

<script>
import {api_client} from '@/API'

export default {
  data() {
    return {
      loading: false,
      current_page: 1,
      per_page: 25,
      logs: [],
      total: 0,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
    }
  },
  computed: {
  },
  watch: {
    current_page: {
        immediate: true,
        handler() {
            this.loadLogs()
        }
    }
    },
  methods: {
    async loadLogs() {
      try {
        this.loading = true
        const start = this.per_page*(this.current_page-1)
        const limit = this.per_page
        const params = {
          route: 'logs',
          _start: start,
          _limit: limit,
        }
        const response = await api_client.get('', {params})
        const {data: {data, metadata}} = response
        this.total = metadata.total || 0
        this.logs = data
      } catch (error) {
        console.log(error)
      }finally {
        this.loading = false
      }
      
    },
    info(content, index, button) {
      this.infoModal.title = `Description: ${index}`
      this.infoModal.content = content
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
  }
}
</script>

<style>

</style>