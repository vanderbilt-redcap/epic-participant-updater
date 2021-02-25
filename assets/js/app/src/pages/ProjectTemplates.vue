<template>
  <div>
    <b-card
    title="Project templates"
    tag="article"
    class="mb-2"
  >
    <b-card-text>
      Download a project template and use it as a starting point or as a reference for how to use the module.
    </b-card-text>
    <ul class="m-0 p-0">
      <li v-for="(url, name) in project_templates" :key="name">
        <a :download="`${name}.xml`" :href="url"><font-awesome-icon :icon="['fas', 'download']" /><span class="ml-2">{{name}}</span></a>
      </li>
    </ul>
    </b-card>
  </div>
</template>

<script>
export default {
  computed: {
    project_templates() {
      return this.$store.state.app_settings.project_templates
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>