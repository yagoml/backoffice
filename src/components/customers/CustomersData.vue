<template>
  <div class="customers-data">
    <div class="d-flex align-items-center mb30 customers-data__actions">
      <div class="position-relative d-flex align-items-center">
        <button class="bo-btn bo-btn--secondary mr10">
          <BIconFilter :style="iconsSize" class="mr-1" /> Filtrar
        </button>
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
      <button class="bo-btn bo-btn--primary ml-auto btn-add">
        <BIconPlus :style="iconsSize" class="mr-1" /> Adicionar
      </button>
    </div>
    <div v-if="customersFiltered.length" class="bo-container">
      <b-table-simple hover responsive>
        <b-thead>
          <b-th class="text-small-sb customers-data__th op1">
            <b-form-checkbox
              v-model="allChecked"
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
                :value="true"
                :unchecked-value="false"
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
            <b-td class="text-medium customers-data__td">{{
              customer.phone
            }}</b-td>
            <b-td class="text-medium customers-data__td">{{
              customer.email
            }}</b-td>
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
                <b-dropdown-item>Editar</b-dropdown-item>
                <b-dropdown-item>Excluir</b-dropdown-item>
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
  BIconThreeDotsVertical
} from 'bootstrap-vue'

@Component<CustomersData>({
  components: {
    IcSearch,
    BIconX,
    BIconPlus,
    BIconFilter,
    BIconThreeDotsVertical
  }
})
export default class CustomersData extends Vue {
  search = ''
  iconsSize = { width: '24px', height: '24px' }
  checked = []
  allChecked = false

  get customers() {
    return this.$store.state.customers.customers
  }

  get customersFiltered() {
    return this.customers.filter((c: ICustomer) => {
      return c.name.toLowerCase().match(this.search.toLowerCase())
    })
  }
}
</script>

<style scoped lang="scss">
.customers-data {
  min-height: 100vh;

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
