<template>
  <div class="d-flex align-items-center vehicle-info">
    <img class="mr10 vehicle-info__img" :src="vehicle.image" />
    <div class="vehicle-info__data">
      <div class="name">{{ vehicle.brand_name }} {{ vehicle.model_name }}</div>
      <div class="text-small mt5">{{ vehicle.version_name }}</div>
      <div class="text-small mt5">
        {{ vehicle.model_year }} - {{ vehicle.fuel_type }}
      </div>
      <div class="text-small mt5">
        {{ vehicle.transmission_type }} -
        {{ vehicle.mileage.toLocaleString() }} km
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IVehicle } from '@/interfaces/vehicles'

@Component
export default class VehicleInfo extends Vue {
  @Prop() readonly vehicle!: IVehicle // vehicle data
}
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
