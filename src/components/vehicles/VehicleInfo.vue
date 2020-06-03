<template>
  <div class="d-flex align-items-center vehicle-info">
    <img
      class="mr10 vehicle-info__img"
      src="https://d3istz5qdrltsq.cloudfront.net/inventory/images/vehicles/6bf5ccd9-17ef-455c-aef9-c1b797329936/showroom/external/front_right_10x.jpeg"
    />
    <div class="vehicle-info__data">
      <div class="name">JEEP COMPASS</div>
      <div class="text-inter-small mt5">GDL8019</div>
      <div class="text-inter-small mt5">2018 - Diesel</div>
      <div class="text-inter-small mt5">Automático - 70.972 km</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class VehicleInfo extends Vue {}
</script>

<style scoped lang="scss">
.vehicle-info {
  &__img {
    width: 80px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
  }

  &__data {
    .name {
      font: bold 12px/1.33 'Inter';
      color: #1e2c4c;
    }
  }
}
</style>
