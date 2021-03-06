<template>
  <div class="bo-container new-customer">
    <FormTabs />
    <b-row>
      <b-col cols="12" lg="6">
        <div class="new-customer__wrapper">
          <CustomerForm ref="customerForm" :ls-data="lsData" :id="id" />
        </div>
      </b-col>
    </b-row>
    <div class="d-flex align-items-center p20 new-customer__footer">
      <button @click="trySubmit" class="bo-btn bo-btn--primary mr15">
        Salvar
      </button>
      <router-link to="/customers" class="bo-btn btn-cancel">
        Cancelar
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICustomer } from '@/interfaces/customers'
import FormTabs from '@/components/customers/FormTabs.vue'
import CustomerForm from '@/components/customers/CustomerForm.vue'
import { v4 as uuidv4 } from 'uuid'

@Component<NewCustomer>({
  components: { FormTabs, CustomerForm }
})
export default class NewCustomer extends Vue {
  /**
   * Localstorage data.
   * @returns Customers list
   */
  get lsData(): ICustomer[] {
    return JSON.parse(localStorage.getItem('customersData') || '')
  }

  /**
   * Uri query param `id`.
   * @returns Customer id for edition
   */
  get id(): string {
    if (!this.$route.query.id) return ''
    return this.$route.query.id.toString()
  }

  /**
   * Customer form component.
   * @returns Customer form $ref
   */
  get customerForm(): HTMLFormElement {
    return this.$refs.customerForm
  }

  $refs!: {
    customerForm: HTMLFormElement
  }

  /**
   * Check form data before submit.
   */
  trySubmit() {
    this.customerForm.checkData()
    if (!this.customerForm.hasErrors) return this.submit()
    document.documentElement.scrollTop = 0
  }

  /**
   * Submit customer form `data`.
   */
  submit() {
    try {
      const p = this.customerForm.data.phones
      let phone = p[0]
      if (p[1].length) phone += ', ' + p[1]
      const data: ICustomer = {
        id: this.id ? this.id : uuidv4(),
        name:
          this.customerForm.data.firstName +
          ' ' +
          this.customerForm.data.lastName,
        email: this.customerForm.data.email,
        phone: phone
      }
      if (this.customerForm.data.postalCode.length)
        data.postalCode = this.customerForm.data.postalCode
      if (this.id) this.editCustomer(data)
      else this.addCustomer(data)
      this.$router.push({
        path: '/customers'
      })
    } catch (e) {
      alert('Erro inesperado. Por favor tente novamente.')
    }
  }

  /**
   * Add new customer.
   * @param data Customer data
   */
  addCustomer(data: ICustomer) {
    this.lsData.unshift(data)
    this.updateLsData()
  }

  /**
   * Edit customer data.
   * @param data Customer data
   */
  editCustomer(data: ICustomer) {
    const index = this.lsData.findIndex(d => d.id === this.id)
    if (index < 0) return
    this.lsData[index] = data
    this.updateLsData()
  }

  /**
   * Update localstorage data.
   */
  updateLsData() {
    localStorage.setItem('customersData', JSON.stringify(this.lsData))
  }
}
</script>

<style scoped lang="scss">
@import 'src/variables';

.new-customer {
  &__wrapper {
    padding: 40px;
  }

  &__footer {
    border-top: 1px solid $light-gray;

    .bo-btn {
      width: 150px;

      &.btn-cancel {
        color: $blue-violet;
      }
    }
  }
}
</style>
