<template>
  <div class="customers-data">
    <div class="d-flex align-items-center mb30 customers-data__actions">
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
          <b-dropdown-item @click="setFilter('l')">Lead</b-dropdown-item>
          <b-dropdown-item @click="setFilter('c')">Cliente</b-dropdown-item>
        </b-dropdown>
        <b-form-input
          v-model="search"
          class="customers-data__search"
          placeholder="Busca por nome..."
        ></b-form-input>
        <IcSearch
          v-if="!search.length"
          class="position-absolute ic-search black-icon"
        />
        <button
          v-else
          @click="search = ''"
          class="bo-btn position-absolute ic-close"
        >
          <BIconX :style="iconsSize" />
        </button>
      </div>
      <div v-if="leadFilter.length" class="d-flex align-items-center ml-5">
        <span class="mr15">Filtro aplicado:</span>
        <button
          v-if="leadFilter === 'l'"
          @click="setFilter('')"
          class="bo-tag bo-tag--secondary"
        >
          Lead <BIconX class="ml-1" style="width: 20px; height: 20px;" />
        </button>
        <button v-else class="bo-tag" @click="setFilter('')">
          Cliente <BIconX class="ml-1" style="width: 20px; height: 20px;" />
        </button>
      </div>
      <div class="d-flex align-items-center ml-auto">
        <button
          v-if="this.selected.length"
          @click="tryRemoveSeveral()"
          class="bo-btn bo-btn--red mr15"
        >
          <BIconTrash :style="{ width: '20px', height: '20px' }" class="mr-1" />
          Excluir ({{ this.selected.length }})
        </button>
        <router-link to="add-customer" class="bo-btn bo-btn--primary btn-add">
          <BIconPlus :style="iconsSize" class="mr-1" /> Adicionar
        </router-link>
      </div>
    </div>
    <div v-if="customersFiltered.length" class="bo-container">
      <b-table-simple hover responsive>
        <b-thead>
          <b-th class="text-small-sb customers-data__th op1">
            <b-form-checkbox
              v-model="allChecked"
              @input="checkAll()"
              :value="true"
              :unchecked-value="false"
            ></b-form-checkbox>
          </b-th>
          <b-th class="text-small-sb customers-data__th">Nome</b-th>
          <b-th class="text-small-sb customers-data__th">Status</b-th>
          <b-th class="text-small-sb customers-data__th">Telefone</b-th>
          <b-th class="text-small-sb customers-data__th">E-mail</b-th>
          <b-th class="text-small-sb customers-data__th"></b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(customer, i) in customersFiltered" :key="i">
            <b-td class="text-medium customers-data__td">
              <b-form-checkbox
                v-model="checked[i]"
                :value="i"
                :unchecked-value="null"
              ></b-form-checkbox>
            </b-td>
            <b-td class="text-medium customers-data__td">{{
              customer.name
            }}</b-td>
            <b-td class="customers-data__td">
              <span v-if="customer.lead" class="bo-tag bo-tag--secondary">
                Lead
              </span>
              <span v-else class="bo-tag">Cliente</span>
            </b-td>
            <b-td class="text-medium customers-data__td">
              {{ customer.phone }}
            </b-td>
            <b-td class="text-medium customers-data__td">
              {{ customer.email }}
            </b-td>
            <b-td class="d-flex justify-content-end customers-data__td">
              <b-dropdown
                :id="`dropdown-${i}`"
                variant="link"
                class="btn-drop"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <BIconThreeDotsVertical
                    style="opacity: .5; color: #8a8a8a;"
                    :id="`dropdown-${i}`"
                  />
                </template>
                <b-dropdown-item @click="edit(i)">Editar</b-dropdown-item>
                <b-dropdown-item @click="tryDelete(i)">Excluir</b-dropdown-item>
              </b-dropdown>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <b-alert v-else show variant="warning customers-data__empty">
      Nenhum cliente encontrado com o(s) termo(s) pesquisados.
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IcSearch from '@/assets/svg/ic-search.svg'
import { ICustomer } from '@/interfaces/customers'
import {
  BIconX,
  BIconPlus,
  BIconFilter,
  BIconThreeDotsVertical,
  BIconTrash
} from 'bootstrap-vue'

@Component<CustomersData>({
  components: {
    IcSearch,
    BIconX,
    BIconPlus,
    BIconFilter,
    BIconThreeDotsVertical,
    BIconTrash
  }
})
export default class CustomersData extends Vue {
  search = ''
  iconsSize = { width: '24px', height: '24px' }
  checked: number[] = []
  allChecked = false
  customers = this.lsData
  leadFilter = ''

  get lsData() {
    return JSON.parse(localStorage.getItem('customersData') || '')
  }

  get selected() {
    return this.checked.filter(c => c !== null)
  }

  get customersFiltered() {
    return this.customers.filter((c: ICustomer) => {
      if (this.leadFilter.length) {
        const val = this.leadFilter === 'l'
        if (val && !c.lead) return false
      }
      return c.name.toLowerCase().match(this.search.toLowerCase())
    })
  }

  created() {
    this.tryLoadJsonData()
  }

  tryLoadJsonData() {
    if (localStorage.getItem('customersData')) return
    localStorage.setItem(
      'customersData',
      JSON.stringify(this.$store.state.customers.customers)
    )
  }

  setFilter(type: string) {
    this.leadFilter = type
  }

  checkAll() {
    this.checked = []
    if (this.allChecked) {
      this.customers.forEach((c: ICustomer, i: number) => {
        this.checked.push(i)
      })
    }
  }

  mounted() {
    document.documentElement.scrollTop = 0
  }

  tryDelete(index: number) {
    const name = this.lsData[index].name.split(' ')[0]
    const confirm = window.confirm(
      `Excluir o cliente ${name}? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    this.delete(index)
  }

  delete(index: number) {
    this.lsData.splice(index, 1)
    this.customers = this.lsData
    localStorage.setItem('customersData', JSON.stringify(this.lsData))
  }

  tryRemoveSeveral() {
    const confirm = window.confirm(
      `Excluir os ${this.selected.length} clientes selecionados? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    const lsCopy = [...[], ...this.customers]
    for (const s of this.selected) lsCopy[s] = null
    this.customers = lsCopy.filter((d: ICustomer) => d)
    localStorage.setItem('customersData', JSON.stringify(this.customers))
    this.checked = []
  }

  edit(index: number) {
    this.$router.push({
      path: '/add-customer?index=' + index
    })
  }
}
</script>

<style scoped lang="scss">
.customers-data {
  &__th {
    padding: 16px 20px;
    border: 0;

    &.op1 {
      opacity: 1;
    }
  }

  &__td {
    vertical-align: middle;
    padding: 11px 20px;
  }

  &__actions {
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
  }

  &__empty {
    width: fit-content;
  }

  .table-responsive {
    overflow-y: hidden;
    margin-bottom: 0;
  }
}
</style>
