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
