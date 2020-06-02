<template>
  <div class="sidebar-menu">
    <div class="d-flex align-items-center sidebar-menu__user-info">
      <Avatar />
      <div class="user-name">
        <div class="text-inter-medium">Meghan H. Vega</div>
        <a href="#" class="d-flex align-items-center logout">
          <img :src="iconLogout" class="icon" /> SAIR
        </a>
      </div>
    </div>
    <ul class="sidebar-menu__items">
      <li class="item">
        <img src="" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/components/user/Avatar'
import IconLogout from '@/assets/svg/icon-logout.svg'

export default {
  name: 'Sidebar',

  components: { Avatar },

  data() {
    return {
      iconLogout: IconLogout,
      items: [
        { copy: 'Início', icon: '' },
        { copy: 'Clientes', icon: '' },
        { copy: 'Veículos', icon: '' },
        { copy: 'Triangulação', icon: '' },
        { copy: 'Financeiro', icon: '', disabled: true }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar-menu {
  position: fixed;
  width: 240px;
  height: 100%;
  box-shadow: 1px 0 0 0 #e0e0e0;
  background-color: white;
  top: 0;
  left: 0;
  padding: 45px 15px;

  &__user-info {
    .user-name {
      margin-left: 17px;

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
}
</style>
