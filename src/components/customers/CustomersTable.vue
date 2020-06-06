<template>
  <div class="customers-table">
    <b-table-simple hover responsive class="bo-table">
      <b-thead>
        <b-th class="text-small-sb customers-table__th op1">
          <b-form-checkbox
            v-model="allChecked"
            @input="checkAll(allChecked)"
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
            <b-form-checkbox v-model="checked[customer.id]"></b-form-checkbox>
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
              <b-dropdown-item @click="$emit('edit', customer.id)">
                Editar
              </b-dropdown-item>
              <b-dropdown-item @click="$emit('tryDelete', customer.id)">
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ICustomer, IChecked } from '@/interfaces/customers'
import { BIconThreeDotsVertical } from 'bootstrap-vue'

@Component<CustomersTable>({
  components: { BIconThreeDotsVertical }
})
export default class CustomersTable extends Vue {
  @Prop() customers!: ICustomer[] // customers current page items
  @Prop() allCheckedState!: boolean // parent all checked state
  allChecked = false // is all checked?

  /**
   * Checked customers
   */
  get checked(): IChecked[] {
    return this.$store.state.customers.checked
  }

  /**
   * Toggle checked state
   */
  toggleChecked(id: string) {
    this.$store.dispatch('customers/toggleChecked', id)
  }

  /**
   * Check/uncheck customer
   * @param id Customer id
   * @param status check?
   */
  setChecked(id: string, status: boolean) {
    this.$store.dispatch('customers/setChecked', {
      id: id,
      status: status
    })
  }

  /**
   * Check all checkboxes of current table page.
   */
  checkAll(status: boolean) {
    this.customers.forEach((c: ICustomer) => {
      this.setChecked(c.id, status)
    })
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
