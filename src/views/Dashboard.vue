<template>
  <b-container fluid class="dashboard">
    <b-row>
      <SidebarMenu />
      <AppHeader />
    </b-row>
  </b-container>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import SidebarMenu from '@/components/SidebarMenu'

export default {
  name: 'Dashboard',

  components: { AppHeader, SidebarMenu }
}
</script>

<style lang="scss">
.dashboard {
  background-color: #f3f4f6;
  height: 100%;
}
</style>
