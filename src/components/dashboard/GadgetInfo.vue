<template>
  <div
    class="d-flex justify-content-between align-items-center white-container gadget-info"
  >
    <div>
      <div class="text-label">{{ gadget.title }}</div>
      <div class="gadget-info__value">{{ gadget.value }}</div>
      <div class="d-flex align-items-center gadget-info__var">
        <img v-if="gadget.percent > 0" src="/svg/ic-arrow-drop-up.svg" />
        <img v-else src="/svg/ic-arrow-drop-down.svg" />
        <span class="percent" :class="{ negative: gadget.percent < 0 }">
          {{ Math.abs(gadget.percent) }}%
        </span>
        <span class="since">{{ gadget.since }}</span>
      </div>
    </div>
    <div>
      <div
        class="d-flex align-items-center justify-content-center gadget-info__icon"
      >
        <slot name="icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IGadgetInfo } from '@/interfaces'

@Component
export default class GadgetInfo extends Vue {
  @Prop() readonly gadget!: IGadgetInfo
}
</script>

<style scoped lang="scss">
.gadget-info {
  padding: 15px 20px;
  height: 110px;

  &__value {
    margin-top: 6px;
    font: 34px/1.06 'Inter';
  }

  &__var {
    margin-top: 8px;
    height: 16px;

    .percent {
      font: 12px/1.33 'Inter';
      margin-right: 5px;
      letter-spacing: 0.4px;
      color: #6200ee;

      &.negative {
        color: #fc4a40;
      }
    }

    .since {
      font: 11px/1.45 'Inter';
      opacity: 0.5;
      color: rgba(0, 0, 0, 0.87);
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    background-color: #f3f7ff;
    border-radius: 50px;
  }
}
</style>
