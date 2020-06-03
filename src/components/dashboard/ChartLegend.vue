<template>
  <div class="chart-legend">
    <div
      v-for="(legend, i) in data"
      :key="i"
      class="d-flex align-items-center mb10 text-inter-medium"
    >
      <span
        class="chart-legend__color"
        :style="{ 'background-color': legend.color }"
      ></span>
      {{ legend.label }}
      <span class="chart-legend__percent">{{ legend.percent }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IChartLegend } from '@/interfaces/dashboard'

@Component
export default class ChartLegend extends Vue {
  @Prop() readonly data!: IChartLegend[]
}
</script>

<style scoped lang="scss">
.chart-legend {
  &__color {
    display: block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 10px;
  }

  &__percent {
    margin-left: 6px;
    font: 12px/1 'Inter';
    color: #a5abb7;
  }
}
</style>
