<template>
  <div
    class="d-flex align-items-center justify-content-between w-100 app-header"
  >
    <div class="d-flex align-items-center app-header__logo">
      <img :src="logoSvg" />
      <div class="backoffice">BACKOFFICE</div>
    </div>
  </div>
</template>

<script>
import LogoSvg from '@/assets/svg/logo.svg'

export default {
  name: 'AppHeader',

  data() {
    return {
      logoSvg: LogoSvg
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
  height: 70px;
  background-color: white;
  padding: 0 34px 0 110px;
  box-shadow: 0 1px 0 0 #e0e0e0;

  &__logo {
    max-height: 34px;

    .backoffice {
      margin: 11px 0 0 7px;
      font: 500 10px 'Roboto';
      color: #a5abb7;
      line-height: 1;
    }
  }
}
</style>
