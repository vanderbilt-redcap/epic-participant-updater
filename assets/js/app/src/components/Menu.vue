<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand :to="{name: link_home.name}" :active="isLinkActive(link_home.name)">
        <span>Epic Participant Updater</span>
        <sup class="small ml-1"><b-badge variant="light" pill>{{module_version}}</b-badge></sup>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-for="(link, index) in links">
          <b-nav-item :key="index" :to="{name: link.name}" :active="isLinkActive(link.name)">{{link.label}}</b-nav-item>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Enabled Projects</em>
            </template>
            <b-dropdown-item v-for="(project, index) in projects" :key="index" :href="project.url"><b-badge class="mr-2" size="sm" variant="info">PID {{project.id}}</b-badge>{{project.title}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {name: 'project-templates', label: 'Project Templates'},
        {name: 'api-token', label: 'API token'},
        {name: 'logs', label: 'Logs'},
      ],
      link_home: {name: 'home', label: 'Home'},
    }
  },
  computed: {
    module_version() {
      return this.$store.state.app_settings.module_version
    },
    projects() {
      const redcap_url = this.$store.state.app_settings.redcap_full_url
      const projects = this.$store.state.projects.list
      const projects_data = projects.map(project => {
        let data = {
          title: project.project.app_title,
          id: project.project_id,
          url: `${redcap_url}?pid=${project.project_id}`,
        } 
        return data
      })
      return projects_data
    }
  },
  methods: {
    isLinkActive(name) {
      return this.$route.name === name
    }
  }
}
</script>

<style>

</style>