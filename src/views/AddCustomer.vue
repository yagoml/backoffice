<template>
  <b-container fluid class="bo-content customer-form">
    <h1 class="mb20 page-title">Adicionar cliente</h1>
    <NewCustomer />
  </b-container>
</template>

<script lang="ts">
import NewCustomer from '@/components/customers/NewCustomer.vue'

export default {
  name: 'AddCustomers',

  components: { NewCustomer }
}
</script>
