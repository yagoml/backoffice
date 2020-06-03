<template>
  <div class="sidebar-menu">
    <div class="d-flex align-items-center sidebar-menu__user-info">
      <Avatar />
      <div class="user-name">
        <div class="text-inter-medium">Meghan H. Vega</div>
        <a href="#" class="d-flex align-items-center logout">
          <IcLogout class="mr-1" />
          SAIR
        </a>
      </div>
    </div>
    <ul class="sidebar-menu__items">
      <li
        class="d-flex align-items-center text-inter-medium item"
        :class="{ disabled: item.disabled }"
        v-for="(item, i) in items"
        :key="i"
      >
        <IcHome v-if="item.icon === 'home'" class="icon" />
        <IcPerson v-if="item.icon === 'person'" class="icon" />
        <IcVectorTriangle v-if="item.icon === 'vector-triangle'" class="icon" />
        <IcDirectionsCar v-if="item.icon === 'directions-car'" class="icon" />
        <IcAccountBalanceWallet
          v-if="item.icon === 'account-balance-wallet'"
          class="icon"
        />
        <span class="item__copy">
          {{ item.copy }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ISBMenuItem } from '@/interfaces/sb-menu'
import Avatar from '@/components/user/Avatar.vue'
import IcLogout from '@/assets/svg/ic-logout.svg'
import IcHome from '@/assets/svg/ic-home.svg'
import IcPerson from '@/assets/svg/ic-person.svg'
import IcVectorTriangle from '@/assets/svg/ic-vector-triangle.svg'
import IcDirectionsCar from '@/assets/svg/ic-directions-car.svg'
import IcAccountBalanceWallet from '@/assets/svg/ic-account-balance-wallet.svg'

@Component<SidebarMenu>({
  components: {
    Avatar,
    IcLogout,
    IcHome,
    IcPerson,
    IcVectorTriangle,
    IcDirectionsCar,
    IcAccountBalanceWallet
  }
})
export default class SidebarMenu extends Vue {
  imgSrc = './svg/ic-home.svg'
  items: ISBMenuItem[] = [
    { copy: 'Início', icon: 'home' },
    { copy: 'Clientes', icon: 'person' },
    { copy: 'Veículos', icon: 'directions-car' },
    { copy: 'Triangulação', icon: 'vector-triangle' },
    { copy: 'Financeiro', icon: 'account-balance-wallet', disabled: true }
  ]
}
</script>

<style lang="scss">
.sidebar-menu {
  position: fixed;
  width: 80px;
  height: 100%;
  box-shadow: 1px 0 0 0 #e0e0e0;
  background-color: white;
  z-index: 2000;
  top: 0;
  left: 0;
  padding: 45px 15px;
  overflow: hidden;

  &__user-info {
    .user-name {
      margin-left: 17px;
      display: none;

      .logout {
        margin-top: 5px;
        font: 500 10px 'Inter';
        letter-spacing: 1.5px;
        opacity: 0.5;
        color: rgba(0, 0, 0, 0.87);

        .icon {
          margin-right: 5px;
        }
      }
    }
  }

  &__items {
    padding: 0;
    list-style: none;
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
      border-radius: 4px;
      cursor: pointer;
      height: 40px;

      &__copy {
        transition: 0.3s ease-in-out;
        display: none;
      }

      .icon {
        g,
        g > path {
          transition: 0.3s ease-in-out;
        }
      }

      &:hover {
        background-color: #f3f7ff;
        color: #0065ff;

        .icon {
          g {
            opacity: 1;
          }

          g > path {
            fill: #0065ff;
          }
        }
      }

      &.disabled {
        opacity: 0.2;
        cursor: default;
        pointer-events: none;
      }
    }
  }

  $root: &;

  &:hover {
    width: 240px;

    .user-name {
      display: inline;
    }

    #{$root}__items {
      display: block;
    }

    .item {
      padding: 12px 13px;

      &__copy {
        display: inline;
      }
    }

    .icon {
      margin-right: 25px;
    }
  }
}
</style>
