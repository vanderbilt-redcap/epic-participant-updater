<template>
    <div class="page">
        <p>Download a project template and use it as a starting point or as a reference for how to use the module.</p>
        <ul>
            <template v-for="(link, label, index) in projectTemplates" :key="index">
            <li><a :href="link" target="_blank" :download="`${label}.xml`">{{ label }}</a></li>
            </template>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '../store'
const store = useAppStore()
const projectTemplates = computed(() => store.settings?.app_settings?.project_templates ?? {})

</script>

<style scoped>

</style>