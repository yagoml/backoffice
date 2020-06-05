<template>
  <div class="d-flex align-items-center form-tabs">
    <div class="tab selected">Dados do cliente</div>
    <div class="tab">Dados do veículo</div>
    <div class="tab">Intenção de compra</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FormTabs extends Vue {}
</script>

<style scoped lang="scss">
@import 'src/variables';
@import 'src/mixins';

.form-tabs {
  height: 48px;
  border-bottom: 1px solid $light-gray;

  .tab {
    @include flex-centered;
    color: rgba(0, 0, 0, 0.38);
    font: 500 14px/1.14 'Inter';
    width: calc(100% / 3);
    height: 100%;
    position: relative;
    text-transform: uppercase;

    &.selected {
      color: $blue-violet;

      &:after {
        content: '';
        width: 100%;
        height: 2px;
        background-color: $blue-violet;
        position: absolute;
        bottom: -1px;
      }
    }
  }
}
</style>
