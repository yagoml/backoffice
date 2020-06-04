<template>
  <div class="bo-container latest-reviews">
    <div
      class="d-flex justify-content-between align-items-center latest-reviews__header"
    >
      <div class="title">Últimas avaliações</div>
      <div class="text-inter-medium">Hoje <IcArrowDown /></div>
    </div>
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center loading"
    >
      <b-spinner label="Carregando..." variant="primary"></b-spinner>
    </div>
    <b-table-simple v-else hover responsive>
      <b-thead>
        <b-th class="text-label">Dados do veículo</b-th>
        <b-th class="text-label">Valor</b-th>
        <b-th class="text-label">Status</b-th>
      </b-thead>
      <b-tbody>
        <ReviewRow
          v-for="data in vehicles"
          :key="data.model_uuid"
          :data="data"
        />
      </b-tbody>
    </b-table-simple>
    <div class="text-right latest-reviews__footer">
      <a href="#" class="see-all">Ver tudo <IcArrowUp class="ic-arrow-up"/></a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReviewRow from '@/components/dashboard/ReviewRow.vue'
import IcArrowDown from '@/assets/svg/ic-arrow-drop-down.svg'
import IcArrowUp from '@/assets/svg/ic-arrow-drop-up.svg'

@Component<LatestReviews>({
  components: { ReviewRow, IcArrowDown, IcArrowUp }
})
export default class LatestReviews extends Vue {
  loading = false

  get vehicles() {
    return this.$store.state.dashboard.vehicles
  }

  async created() {
    this.loading = true
    await this.$store.dispatch('dashboard/getVehicles')
    this.loading = false
  }
}
</script>

<style lang="scss">
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

      .ic-arrow-up {
        transform: rotate(90deg);
      }
    }
  }

  .table-responsive {
    height: 540px;
    overflow: auto;
    margin-bottom: 0;

    .table {
      border-collapse: collapse;

      .text-label {
        box-shadow: 1px 0 0 1px #e8e8e8;
        padding: 0 20px 20px;
        border-top: 0;
        border-bottom: 1px solid #dee2e6;
        position: sticky;
        top: 0;
        opacity: 1;
        color: #768095;
        background-color: white;
      }
    }
  }

  .loading {
    height: 400px;
  }
}
</style>
