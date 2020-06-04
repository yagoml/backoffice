<template>
  <b-container fluid class="bo-content add-customer">
    <h1 class="mb20 add-customer__title">Adicionar cliente</h1>
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

<style lang="scss">
.add-customer {
  &__title {
    font: 500 20px/1.2 'Inter';
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
