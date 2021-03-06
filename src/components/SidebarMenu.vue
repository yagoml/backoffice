<template>
  <div
    ref="menu"
    @mouseenter="opened = true"
    @mouseleave="opened = false"
    class="sidebar-menu"
    :class="{ opened: opened }"
  >
    <div class="d-flex align-items-center sidebar-menu__user-info">
      <Avatar />
      <div class="user-name">
        <div class="text-medium">Meghan H. Vega</div>
        <a href="#" class="d-flex align-items-center logout">
          <IcLogout class="mr-1" />
          SAIR
        </a>
      </div>
    </div>
    <ul class="sidebar-menu__items">
      <li v-for="(item, i) in items" :key="i">
        <router-link
          :to="item.path"
          class="d-flex align-items-center text-medium item"
          :class="{
            disabled: item.disabled,
            active: $route.path === item.path
          }"
          @click.native="opened = false"
        >
          <IcHome v-if="item.icon === 'home'" class="icon" />
          <IcPerson v-if="item.icon === 'person'" class="icon" />
          <IcVectorTriangle
            v-if="item.icon === 'vector-triangle'"
            class="icon"
          />
          <IcDirectionsCar v-if="item.icon === 'directions-car'" class="icon" />
          <IcAccountBalanceWallet
            v-if="item.icon === 'account-balance-wallet'"
            class="icon"
          />
          <span class="item__copy">
            {{ item.copy }}
          </span>
        </router-link>
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
  opened = false // is opened?
  imgSrc = './svg/ic-home.svg' // icon home
  items: ISBMenuItem[] = [
    { copy: 'Início', icon: 'home', path: '/' },
    { copy: 'Clientes', icon: 'person', path: '/customers' },
    { copy: 'Veículos', icon: 'directions-car', path: '/vehicles' },
    { copy: 'Triangulação', icon: 'vector-triangle', path: '#' },
    {
      copy: 'Financeiro',
      icon: 'account-balance-wallet',
      path: '#',
      disabled: true
    }
  ] // Menu items data
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
      padding: 12px 13px;
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

      &.active {
        background-color: #f3f7ff;
        color: #0065ff;
        text-decoration: none;

        .icon {
          g {
            opacity: 1;
          }

          g > path {
            fill: #0065ff;
          }
        }
      }

      &:hover {
        @extend .active;
      }

      &.disabled {
        opacity: 0.2;
        cursor: default;
        pointer-events: none;
      }
    }
  }

  $root: &;

  &.opened {
    width: 240px;

    .user-name {
      display: inline;
    }

    #{$root}__items {
      display: block;
    }

    .item {
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
