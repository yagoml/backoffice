<template>
  <b-container fluid class="bo-content dashboard">
    <CustomersData />
  </b-container>
</template>

<script lang="ts">
import CustomersData from '@/components/customers/CustomersData.vue'

export default {
  name: 'Customers',

  components: { CustomersData }
}
</script>
