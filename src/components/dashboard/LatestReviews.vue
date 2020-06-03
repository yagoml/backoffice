<template>
  <div class="white-container latest-reviews">
    <div
      class="d-flex justify-content-between align-items-center latest-reviews__header"
    >
      <div class="title">Últimas avaliações</div>
      <div class="text-inter-medium when">Hoje</div>
    </div>
    <b-table-simple hover responsive>
      <b-thead>
        <b-th class="text-label">Dados do veículo</b-th>
        <b-th class="text-label">Valor</b-th>
        <b-th class="text-label">Status</b-th>
      </b-thead>
      <b-tbody>
        <ReviewRow />
      </b-tbody>
    </b-table-simple>
    <div class="text-right latest-reviews__footer">
      <a href="#" class="see-all">Ver tudo</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReviewRow from '@/components/dashboard/ReviewRow.vue'

@Component<LatestReviews>({
  components: { ReviewRow }
})
export default class LatestReviews extends Vue {}
</script>

<style scoped lang="scss">
.latest-reviews {
  &__header {
    padding: 20px;
  }

  &__footer {
    border-top: solid 1px rgba(0, 0, 0, 0.12);
    padding: 7px 25px;

    .see-all {
      font: 500 14px/1.71 'Inter';
      letter-spacing: 0.1px;
      color: #0065ff;
    }
  }

  .table-responsive {
    margin-bottom: 0;

    .b-table {
      .text-label {
        border-top: 0;
        border-bottom: 1px solid #dee2e6;
      }
    }
  }
}
</style>
