<template>
  <div id="app">
    <router-view />
    <Copyright />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Copyright from '@/components/Copyright.vue'

export default Vue.extend({
  components: { Copyright }
})
</script>

<style lang="scss">
@import './main.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

#app {
  height: 100%;
  background-color: #f3f4f6;
}
</style>
