<template>
  <b-container fluid class="bo-content dashboard">
    <CustomersTable />
  </b-container>
</template>

<script lang="ts">
import CustomersTable from '@/components/customers/CustomersTable.vue'

export default {
  name: 'Customers',

  components: { CustomersTable }
}
</script>
