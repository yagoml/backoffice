<template>
  <div class="d-flex justify-content-lg-between align-items-center copyright">
    <span class="copyright__copy">2020 © Dryve Tecnologia Ltda.</span>
    <span class="copyright__version">Versão 1.0.1</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Copyright extends Vue {}
</script>

<style scoped lang="scss">
.copyright {
  padding: 20px 0;
  border-top: 1px solid #dfe3e8;
  font-family: 'Roboto';
  padding: 20px 55px 20px 110px;

  &__copy {
    font-size: 14px;
    line-height: 1.57;
    color: #616161;
  }

  &__version {
    opacity: 0.5;
    font-size: 12px;
    line-height: 1.5;
    color: #6b6c6f;
  }
}
</style>
