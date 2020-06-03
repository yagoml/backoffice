<template>
  <b-container fluid class="pt70 dashboard">
    <b-row>
      <DashContent />
    </b-row>
  </b-container>
</template>

<script>
import DashContent from '@/components/dashboard/DashContent'

export default {
  name: 'Dashboard',

  components: { DashContent }
}
</script>

<style lang="scss">
.dashboard {
  height: 100%;
}
</style>
