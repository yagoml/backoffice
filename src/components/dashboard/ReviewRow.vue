<template>
  <b-tr class="review-row">
    <b-td class="review-row__col">
      <VehicleInfo />
    </b-td>
    <b-td class="review-row__col">
      <div class="text-inter-small">ANÚNCIO</div>
      <div class="review-row__price mt5">R$ 38.900</div>
      <div class="text-inter-small mt6">MÍNIMO ACEITO</div>
      <div class="review-row__min mt5">R$ 36.900</div>
    </b-td>
    <b-td class="review-row__col">
      <div class="review-row__status">Aguardando precificação</div>
      <div class="mt10 review-row__time">18/04/2020 às 14:35</div>
    </b-td>
  </b-tr>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VehicleInfo from '@/components/vehicles/VehicleInfo.vue'

@Component<ReviewRow>({
  components: { VehicleInfo }
})
export default class ReviewRow extends Vue {}
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
    padding: 20px 12px;
  }
}
</style>
