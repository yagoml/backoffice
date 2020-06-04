<template>
  <div id="app">
    <SidebarMenu />
    <AppHeader />
    <router-view />
    <Copyright />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/AppHeader'
import SidebarMenu from '@/components/SidebarMenu'
import Copyright from '@/components/Copyright.vue'

export default Vue.extend({
  components: { Copyright, AppHeader, SidebarMenu }
})
</script>

<style lang="scss">
@import './main.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

#app {
  height: 100%;
}

body {
  background-color: #f3f4f6;
}
</style>
