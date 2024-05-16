<template>
  <template v-if="loading">
    <div class="d-flex gap-2 align-items-center p-2">
      <i class="fas fa-spinner fa-spin fa-fw" />
      <span>Loading...</span>
    </div>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {useAppStore} from './store'
const store = useAppStore()
const loading = ref(false)
const error = ref()

onMounted(async () => {
  loading.value = true
  await store.init()
  loading.value = false
})
</script>


<style scoped>

</style>
