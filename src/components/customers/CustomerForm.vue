<template>
  <b-form class="customer-form">
    <b-row>
      <b-col cols="12" lg="6">
        <b-form-input
          v-model="data.firstName"
          placeholder="Nome"
          @input="errors.firstName = null"
          @blur="checkName('firstName', 'Nome')"
          :class="{ 'input-error': errors.firstName }"
        />
        <div v-if="errors.firstName" class="form-error">
          {{ errors.firstName }}
        </div>
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-input
          v-model="data.lastName"
          @input="errors.lastName = null"
          @blur="checkName('lastName', 'Sobrenome')"
          :class="{ 'input-error': errors.lastName }"
          placeholder="Sobrenome"
        />
        <div v-if="errors.lastName" class="form-error">
          {{ errors.lastName }}
        </div>
      </b-col>
    </b-row>
    <div class="position-relative">
      <b-form-input
        v-model="data.email"
        :class="{ 'input-error': errors.email }"
        @input="errors.email = null"
        @blur="checkEmail()"
        placeholder="E-mail"
      />
      <div v-if="errors.email" class="form-error full-field">
        {{ errors.email }}
      </div>
    </div>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-input
          v-model="data.phones[0]"
          v-mask="['(##) ####-####', '(##) #####-####']"
          @input="errors.phone = null"
          @blur="checkPhone(0)"
          :class="{ 'input-error': errors.phone }"
          placeholder="Telefone"
        />
        <div v-if="errors.phone" class="form-error">
          {{ errors.phone }}
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div
          v-if="phones === 1"
          @click="phones++"
          class="d-flex align-items-center add-another"
        >
          + adicionar outro
        </div>
        <b-form-input
          v-model="data.phones[1]"
          v-else
          @input="errors.phone2 = null"
          v-mask="['(##) ####-####', '(##) #####-####']"
          @blur="checkPhone(1)"
          :class="{ 'input-error': errors.phone2 }"
          placeholder="Telefone 2"
        />
        <div v-if="errors.phone2" class="form-error">
          {{ errors.phone2 }}
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-input
          v-model="data.postalCode"
          @input="errors.postalCode = null"
          @blur="checkPostalCode()"
          v-mask="['#####-###']"
          :class="{ 'input-error': errors.postalCode }"
          placeholder="CEP"
        />
        <div v-if="errors.postalCode" class="form-error">
          {{ errors.postalCode }}
        </div>
      </b-col>
    </b-row>
    <b-form-input disabled placeholder="Endereço" />
    <b-row>
      <b-col cols="12" lg="6">
        <b-form-input disabled placeholder="Número" />
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-input disabled placeholder="Complemento" />
      </b-col>
    </b-row>
    <b-form-input disabled placeholder="Bairro" />
    <b-row>
      <b-col cols="12" lg="6">
        <b-form-input disabled placeholder="Cidade" />
      </b-col>
      <b-col cols="12" lg="6">
        <b-form-input disabled placeholder="Estado" />
      </b-col>
    </b-row>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mask } from 'vue-the-mask'
import {
  ICustomerData,
  ICustomerError,
  ICustomer
} from '@/interfaces/customers'

@Component<CustomerForm>({
  directives: { mask }
})
export default class CustomerForm extends Vue {
  @Prop() lsData!: ICustomer[] // localstorage data
  @Prop() index!: string // selected index for edition

  phones = 1 // number of phones fields (max: 2)
  data: ICustomerData = {
    firstName: '',
    lastName: '',
    email: '',
    phones: ['', ''],
    postalCode: ''
  } // form data
  errors: ICustomerError = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    phone2: null,
    postalCode: null
  } // erros data

  /**
   * Form errors state.
   * @returns Errors found?
   */
  get hasErrors(): boolean {
    return Object.values(this.errors).filter(e => e != null).length > 0
  }

  mounted() {
    if (this.index.length) this.loadData(parseInt(this.index))
  }

  /**
   * Load form data of customer for edition.
   * @param index Customer index
   */
  loadData(index: number) {
    const data = this.lsData[index]
    this.data.firstName = data.name.split(' ')[0]
    this.data.lastName = data.name.replace(this.data.firstName + ' ', '')
    this.data.email = data.email
    const phones = data.phone.split(',')
    this.data.phones[0] = phones[0]
    if (phones[1]) {
      this.data.phones[1] = phones[1]
      this.phones++
    }
    if (data.postalCode) this.data.postalCode = data.postalCode
  }

  /**
   * Check form data. Set `errors`.
   */
  checkData() {
    this.checkName('firstName', 'Nome')
    this.checkName('lastName', 'Sobrenome')
    this.checkEmail()
    this.checkPhone(0)
    if (this.data.phones[1].length) this.checkPhone(1)
    this.checkPostalCode()
  }

  /**
   * Check names.
   * @param key `firstName` or `lastName`
   * @param name Value to check
   */
  checkName(key: string, name: string) {
    this.errors[key] = null

    if (!this.data[key].length)
      return (this.errors[key] = name + ' é obrigatório')

    if (this.data[key].length < 3)
      return (this.errors[key] = name + ' deve ter pelo menos 3 caracteres')

    const rgx = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)

    if (!rgx.test(this.data[key].toString()))
      this.errors[key] = name + ' inválido'
  }

  /**
   * Check email.
   */
  checkEmail() {
    this.errors.email = null

    if (!this.data.email.length)
      return (this.errors.email = 'E-mail é obrigatório')

    const rgx = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    if (this.data.email.length < 5 || !rgx.test(this.data.email))
      this.errors.email = 'E-mail inválido'
  }

  /**
   * Check phones.
   * @param n Phone index (0 or 1)
   */
  checkPhone(n: number) {
    const key = !n ? 'phone' : 'phone2'
    this.errors[key] = null

    if (!this.data.phones[n].length) {
      if (!n) return (this.errors[key] = 'Telefone é obrigatório')
      return
    }

    const rgx = new RegExp(/(\(\d{2}\))\s(\d{4,5}-\d{4})/)

    if (this.data.phones[n].length < 14 || !rgx.test(this.data.phones[n]))
      this.errors[key] = 'Telefone inválido'
  }

  /**
   * Check postal code.
   */
  checkPostalCode() {
    this.errors.postalCode = null
    if (!this.data.postalCode.length) return
    const rgx = new RegExp(/\d{5}-\d{3}/)
    if (this.data.postalCode.length < 9 || !rgx.test(this.data.postalCode))
      this.errors.postalCode = 'CEP inválido'
  }
}
</script>

<style scoped lang="scss">
@import 'src/variables';

.customer-form {
  .form-control {
    height: 56px;
    font: 16px/1.5 $font-secondary;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 15px;
    border-color: rgba(0, 0, 0, 0.38);

    &:disabled {
      background-color: white;
      opacity: 0.4;
    }
  }

  .add-another {
    height: 56px;
    color: $bright-blue;
    font: 500 14px/1.71 $font-primary;
    cursor: pointer;
  }

  .input-error {
    margin-bottom: 25px;
    border: 1px solid $coral;
    color: $coral;
  }

  .form-error {
    position: absolute;
    bottom: 7px;
    font-size: 12px;
    padding-left: 5px;
    color: $coral;

    &.full-field {
      bottom: -17px;
    }
  }
}
</style>
