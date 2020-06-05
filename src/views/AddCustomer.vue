<template>
  <b-container fluid class="bo-content customer-form">
    <h1 class="mb20 page-title">Adicionar cliente</h1>
    <CustomerForm />
  </b-container>
</template>

<script lang="ts">
import CustomerForm from '@/components/customers/CustomerForm.vue'

export default {
  name: 'AddCustomers',

  components: { CustomerForm }
}
</script>
