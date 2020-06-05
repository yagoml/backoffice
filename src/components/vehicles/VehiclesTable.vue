<template>
  <div class="bo-container vehicles-table">
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center loading"
    >
      <b-spinner label="Carregando..." variant="primary"></b-spinner>
    </div>
    <b-table
      v-else
      hover
      responsive
      class="bo-table"
      :items="items"
      :fields="fields"
    ></b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  IVehicleTable,
  IVehicleTableField,
  IVehicle
} from '@/interfaces/vehicles'

@Component
export default class VehiclesTable extends Vue {
  loading = false
  fields: IVehicleTableField[] = [
    {
      key: 'brand',
      label: 'Marca',
      sortable: true
    },
    {
      key: 'model',
      label: 'Modelo',
      sortable: true
    },
    {
      key: 'name',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'year',
      label: 'Ano',
      sortable: true
    },
    {
      key: 'fuel',
      label: 'Combustível',
      sortable: true
    },
    {
      key: 'transmission',
      label: 'Transmissão',
      sortable: true
    },
    {
      key: 'km',
      label: 'KM',
      sortable: true
    },
    {
      key: 'price',
      label: 'Preço',
      sortable: true
    }
  ]
  items: IVehicleTable[] = []

  get vehicles(): IVehicle[] {
    return this.$store.state.dashboard.vehicles
  }

  async created() {
    this.loading = true
    await this.$store.dispatch('dashboard/getVehicles')
    this.loading = false
    this.setVehicles()
  }

  setVehicles() {
    for (const vehicle of this.vehicles) {
      this.items.push({
        brand: vehicle.brand_name,
        model: vehicle.model_name,
        name: vehicle.name,
        year: vehicle.manufacturing_year + '/' + vehicle.model_year,
        fuel: vehicle.fuel_type,
        transmission: vehicle.transmission_type,
        km: vehicle.mileage.toLocaleString(),
        price: vehicle.ad_selling_price.toLocaleString()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.vehicles-table {
  .loading {
    height: 400px;
  }

  .b-table {
    margin: 0;
  }
}
</style>
