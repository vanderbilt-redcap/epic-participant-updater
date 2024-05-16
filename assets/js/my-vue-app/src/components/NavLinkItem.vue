<template>
    <RouterLink :to="to" custom v-slot="{ href, isExactActive }">
      <li class="nav-item">
        <a class="nav-link" :class="{active: isExactActive }" :href="href">
          <slot></slot> <!-- This is where you insert any content inside the <CombinedNavLink> component -->
        </a>
      </li>
    </RouterLink>
  </template>
  
  <script setup>
  import { toRefs } from 'vue';
  import { RouterLink, useLink } from 'vue-router';
  
  // Props definition
  const props = defineProps({
    to: { type: [String, Object], required: true }, // Accepts both string or location object
    active: Boolean // This prop is optional and can be used to override the active state if needed
  });
  
  const { to } = toRefs(props); // toRefs is used to create a reactive reference for the 'to' prop
  
  // Use the useLink composable from Vue Router to access link properties such as href and isExactActive
  const { href, isExactActive } = useLink({ to });
  </script>
  
  <style scoped>
  .nav-item {
    /* Your .nav-item styles here */
  }
  
  .nav-link {
    /* Your .nav-link styles here */
    outline: none;
  }
  
  .nav-link.active {
    /* Styles for when the link is active */
  }
  </style>
  