<template>
  <b-tr class="review-row">
    <b-td class="review-row__col">
      <VehicleInfo :vehicle="data" />
    </b-td>
    <b-td class="review-row__col">
      <div class="text-small">ANÚNCIO</div>
      <div class="review-row__price mt5">
        R$ {{ data.ad_selling_price.toLocaleString() }}
      </div>
      <div class="text-small mt6">MÍNIMO ACEITO</div>
      <div class="review-row__min mt5">
        R$ {{ minAccepted.toLocaleString() }}
      </div>
    </b-td>
    <b-td class="review-row__col">
      <div class="review-row__status">Aguardando precificação</div>
      <div class="mt10 review-row__time">18/04/2020 às 14:35</div>
    </b-td>
  </b-tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VehicleInfo from '@/components/vehicles/VehicleInfo.vue'
import { IVehicle } from '@/interfaces/dashboard'

@Component<ReviewRow>({
  components: { VehicleInfo }
})
export default class ReviewRow extends Vue {
  @Prop() readonly data!: IVehicle

  get minAccepted(): number {
    return Math.floor(
      this.data.ad_selling_price - this.data.ad_selling_price * 0.05
    )
  }
}
</script>

<style scoped lang="scss">
.review-row {
  .mt6 {
    margin-top: 6px;
  }

  &__price {
    font: bold 12px/1 'Inter';
    color: #1e2c4c;
  }

  &__min {
    font: 12px/1 'Inter';
    color: #a5abb7;
  }

  &__status {
    padding: 7px 16px;
    border-radius: 13px;
    background-color: #f3f7ff;
    font: 12px/1 'Inter';
    color: #768095;
    width: fit-content;
  }

  &__time {
    padding: 0 34px;
    font: 11px 'Inter';
    color: #a5abb7;
  }

  &__col {
    padding: 20px;
  }
}
</style>
