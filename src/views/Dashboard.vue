<template>
  <b-container fluid class="dashboard">
    <b-row>
      <SidebarMenu />
      <AppHeader />
      <DashContent />
    </b-row>
  </b-container>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import SidebarMenu from '@/components/SidebarMenu'
import DashContent from '@/components/dashboard/DashContent'

export default {
  name: 'Dashboard',

  components: { AppHeader, SidebarMenu, DashContent }
}
</script>

<style lang="scss">
.dashboard {
  height: 100%;
}
</style>
