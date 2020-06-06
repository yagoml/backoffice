<template>
  <div class="d-flex align-items-center mb30 customers-actions">
    <div class="position-relative d-flex align-items-center">
      <b-dropdown
        id="dropdown-filter"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
      >
        <template v-slot:button-content>
          <button class="bo-btn bo-btn--secondary mr10">
            <BIconFilter :style="iconsSize" class="mr-1" /> Filtrar
          </button>
        </template>
        <b-dropdown-item @click="$emit('setFilter', 'l')">Lead</b-dropdown-item>
        <b-dropdown-item @click="$emit('setFilter', 'c')">
          Cliente
        </b-dropdown-item>
      </b-dropdown>
      <b-form-input
        v-model="input"
        class="customers-actions__search"
        placeholder="Busca por nome..."
        @input="$emit('search', input)"
      ></b-form-input>
      <IcSearch
        v-if="!input.length"
        class="position-absolute ic-search black-icon"
      />
      <button
        v-else
        @click="input = ''"
        class="bo-btn position-absolute ic-close"
      >
        <BIconX :style="iconsSize" />
      </button>
    </div>
    <div v-if="leadFilter.length" class="d-flex align-items-center ml-5">
      <span class="mr15">Filtro aplicado:</span>
      <button
        v-if="leadFilter === 'l'"
        @click="$emit('setFilter', '')"
        class="bo-tag bo-tag--secondary"
      >
        Lead <BIconX class="ml-1" style="width: 20px; height: 20px;" />
      </button>
      <button v-else class="bo-tag" @click="$emit('setFilter', '')">
        Cliente <BIconX class="ml-1" style="width: 20px; height: 20px;" />
      </button>
    </div>
    <div class="d-flex align-items-center ml-auto">
      <button
        v-if="selected.length"
        @click="$emit('tryRemoveSeveral')"
        class="bo-btn bo-btn--red mr15"
      >
        <BIconTrash :style="{ width: '20px', height: '20px' }" class="mr-1" />
        Excluir ({{ selected.length }})
      </button>
      <router-link to="customer-form" class="bo-btn bo-btn--primary btn-add">
        <BIconPlus :style="iconsSize" class="mr-1" /> Adicionar
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import IcSearch from '@/assets/svg/ic-search.svg'
import { BIconX, BIconPlus, BIconFilter, BIconTrash } from 'bootstrap-vue'

@Component<CustomersActions>({
  components: {
    IcSearch,
    BIconX,
    BIconPlus,
    BIconFilter,
    BIconTrash
  }
})
export default class CustomersActions extends Vue {
  @Prop() selected!: number[] // selected indexes list
  @Prop() search!: string // search terms
  @Prop() leadFilter!: string // current filter
  iconsSize = { width: '24px', height: '24px' } // icons size
  input = '' // search input current value
}
</script>

<style scoped lang="scss">
.customers-actions {
  .btn-add {
    padding: 10px 18px 10px 10px;
  }

  .ic-search {
    right: 12px;
  }

  .ic-close {
    right: 0;
    padding: 5px 10px;

    &:hover {
      .b-icon {
        fill: #6200ee;
      }
    }
  }

  &__search {
    padding: 6px 16px;
    height: 36px;
    border-radius: 4px;
    width: 372px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.38);
    color: rgba(0, 0, 0, 0.6);
    letter-spacing: 0.1px;
    font: 500 14px/1.71 'Inter';

    &:focus {
      border-color: rgba(0, 0, 0, 0.38);
    }
  }
}
</style>
