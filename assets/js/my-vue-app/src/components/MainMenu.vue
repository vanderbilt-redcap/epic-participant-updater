<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Epic Participant Updater</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <NavLinkItem to="/">Home</NavLinkItem>
                    </li>
                    <li class="nav-item">
                        <NavLinkItem to="/project-templates">Project Templates</NavLinkItem>
                    </li>
                    <li class="nav-item">
                        <NavLinkItem to="/api-token">API token</NavLinkItem>
                    </li>
                    <li class="nav-item">
                        <NavLinkItem to="/logs">Logs</NavLinkItem>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
import NavLinkItem from './NavLinkItem.vue'
</script>

<style lang="scss" scoped>

</style>