<template>
  <div
    class="d-flex align-items-center justify-content-between w-100 app-header"
  >
    <div class="d-flex align-items-center app-header__logo">
      <router-link to="/"><img src="logo.svg"/></router-link>
      <div class="backoffice">BACKOFFICE</div>
    </div>
    <div class="d-flex align-items-center">
      <router-link to="/customers" class="bo-btn" title="Pesquisar">
        <IcSearch />
      </router-link>
      <button class="bo-btn" title="Notificações"><IcNotifications /></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IcSearch from '@/assets/svg/ic-search.svg'
import IcNotifications from '@/assets/svg/ic-notifications.svg'

@Component<AppHeader>({
  components: { IcSearch, IcNotifications }
})
export default class AppHeader extends Vue {}
</script>

<style lang="scss">
.app-header {
  height: 70px;
  background-color: white;
  padding: 0 34px 0 110px;
  box-shadow: 0 1px 0 0 #e0e0e0;
  position: fixed;
  z-index: 1000;

  &__logo {
    max-height: 34px;

    .backoffice {
      margin: 11px 0 0 7px;
      font: 500 10px 'Roboto';
      color: #a5abb7;
      line-height: 1;
    }
  }

  .bo-btn {
    height: 50px;

    &:hover {
      g > path {
        fill: #0065ff !important;
      }
    }
  }
}
</style>
