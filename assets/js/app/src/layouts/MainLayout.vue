
<template>
    <section class="layout">
      <Menu />
      <div class="page-wrapper mt-2">
          <router-view />
      </div>

    </section>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'MainLayout',
  components: {Menu},
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}
.page-wrapper {
  /* padding: 25px 0; */
  flex: 1;
}
nav a + a {
  margin-left: 5px;
}
@media only screen and (max-width: 768px) {

}
</style>