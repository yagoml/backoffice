<template>
  <div class="customers-table">
    <b-table-simple hover responsive class="bo-table">
      <b-thead>
        <b-th class="text-small-sb customers-table__th op1">
          <b-form-checkbox
            v-model="allChecked"
            @input="$emit('toggleCheckAll', allChecked)"
            :value="true"
            :unchecked-value="false"
          ></b-form-checkbox>
        </b-th>
        <b-th class="text-small-sb customers-table__th">Nome</b-th>
        <b-th class="text-small-sb customers-table__th">Status</b-th>
        <b-th class="text-small-sb customers-table__th">Telefone</b-th>
        <b-th class="text-small-sb customers-table__th">E-mail</b-th>
        <b-th class="text-small-sb customers-table__th"></b-th>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(customer, i) in customers" :key="i">
          <b-td class="text-medium">
            <b-form-checkbox
              v-model="checked[i]"
              :value="i"
              :unchecked-value="null"
            ></b-form-checkbox>
          </b-td>
          <b-td class="text-medium">
            {{ customer.name }}
          </b-td>
          <b-td class="customers-table">
            <span v-if="customer.lead" class="bo-tag bo-tag--secondary">
              Lead
            </span>
            <span v-else class="bo-tag">Cliente</span>
          </b-td>
          <b-td class="text-medium">
            {{ customer.phone }}
          </b-td>
          <b-td class="text-medium">
            {{ customer.email }}
          </b-td>
          <b-td class="d-flex justify-content-end">
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
              <b-dropdown-item @click="$emit('edit', i)">
                Editar
              </b-dropdown-item>
              <b-dropdown-item @click="$emit('tryDelete', i)">
                Excluir
              </b-dropdown-item>
            </b-dropdown>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ICustomer } from '@/interfaces/customers'
import { BIconThreeDotsVertical } from 'bootstrap-vue'

@Component<CustomersTable>({
  components: { BIconThreeDotsVertical }
})
export default class CustomersTable extends Vue {
  @Prop() customers!: ICustomer[] // customers current page items
  @Prop() allCheckedState!: boolean // parent all checked state
  allChecked = false // is all checked?
  @Prop() checked!: number[] // selected indexes list

  // Watch parent all checked state change
  @Watch('allCheckedState')
  onStateChange(value: boolean) {
    this.allChecked = value
  }
}
</script>

<style lang="scss">
.customers-table {
  &__th {
    &.op1 {
      opacity: 1;
    }
  }

  .table-responsive {
    overflow-y: hidden;
    margin-bottom: 0;
  }
}
</style>
