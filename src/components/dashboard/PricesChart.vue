<template>
  <div class="bo-container prices-chart">
    <div class="d-flex align-items-center text-medium mb20">
      Preços - Dryve x KBB <IcHelp class="ml-1" id="help" />
    </div>
    <b-tooltip target="help" triggers="hover">
      Comparação com os preços da <b>KBB</b>!
    </b-tooltip>
    <div class="d-flex align-items-center">
      <div class="prices-chart__donut">
        <GChart
          type="PieChart"
          :settings="{ packages: ['corechart'] }"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
      <ChartLegend :data="chartLegend" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IcHelp from '@/assets/svg/ic-help.svg'
import { GChart } from 'vue-google-charts'
import ChartLegend from '@/components/dashboard/ChartLegend.vue'
import { IChartLegend } from '@/interfaces/dashboard'

@Component<PricesGraphic>({
  components: { IcHelp, GChart, ChartLegend }
})
export default class PricesGraphic extends Vue {
  // Array will be automatically processed with visualization.arrayToDataTable function
  chartData = [
    ['Label', 'Quantity'],
    ['Na média', 60],
    ['Acima da média', 25],
    ['Abaixo da média', 15]
  ]
  chartLegend: IChartLegend[] = [
    { label: 'Na média', percent: 60, color: '#1070ca' },
    { label: 'Acima da média', percent: 25, color: '#ec4c47' },
    { label: 'Abaixo da média', percent: 15, color: '#f7d154' }
  ]
  chartOptions = {
    pieHole: 0.8,
    pieSliceText: 'none',
    height: 143,
    chartArea: { left: 0, height: '100%', width: '100%' },
    legend: {
      position: 'none'
    }
  }
}
</script>

<style scoped lang="scss">
.prices-chart {
  padding: 20px;

  &__donut {
    width: 50%;
  }
}
</style>
