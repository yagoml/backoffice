<template>
  <div class="bo-container customers-table">
    <b-table-simple hover responsive>
      <b-thead>
        <b-th class="text-small-sb">Nome</b-th>
        <b-th class="text-small-sb">Status</b-th>
        <b-th class="text-small-sb">Telefone</b-th>
        <b-th class="text-small-sb">E-mail</b-th>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(customer, i) in customers" :key="i">
          <b-td class="text-medium">{{ customer.name }}</b-td>
          <b-td>
            <span v-if="customer.lead" class="bo-tag bo-tag--secondary">
              Lead
            </span>
            <span v-else class="bo-tag">Cliente</span>
          </b-td>
          <b-td class="text-medium">{{ customer.phone }}</b-td>
          <b-td class="text-medium">{{ customer.email }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CustomersTable extends Vue {
  get customers() {
    return this.$store.state.customers.customers
  }
}
</script>

<style scoped lang="scss">
.customers-table {
  .text-medium {
    vertical-align: middle;
  }
}
</style>
