<template>
  <b-container fluid class="bo-content vehicles">
    <h1 class="mb20 page-title">Veículos</h1>
    <VehiclesTable />
  </b-container>
</template>

<script lang="ts">
import VehiclesTable from '@/components/vehicles/VehiclesTable.vue'

export default {
  name: 'Vehicles',

  components: { VehiclesTable }
}
</script>

<style scoped lang="scss"></style>
