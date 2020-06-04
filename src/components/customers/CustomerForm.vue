<template>
  <div class="bo-container customer-form">
    <div class="d-flex align-items-center customer-form__tabs">
      <div class="tab selected">Dados do cliente</div>
      <div class="tab">Dados do veículo</div>
      <div class="tab">Intenção de compra</div>
    </div>
    <b-row>
      <b-col cols="12" lg="6">
        <div class="customer-form__wrapper">
          <b-form class="customer-form__form">
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
                  v-mask="['(##)####-####', '(##)#####-####']"
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
                  v-mask="['(##)####-####', '(##)#####-####']"
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
        </div>
      </b-col>
    </b-row>
    <div class="d-flex align-items-center p20 customer-form__footer">
      <button @click="trySubmit" class="bo-btn bo-btn--primary mr15">
        Salvar
      </button>
      <button class="bo-btn btn-cancel">Cancelar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICustomerData, ICustomerErrors } from '@/interfaces/customers'
import { mask } from 'vue-the-mask'

@Component<CustomerForm>({
  directives: { mask }
})
export default class CustomerForm extends Vue {
  phones = 1
  data: ICustomerData = {
    firstName: '',
    lastName: '',
    email: '',
    phones: ['', ''],
    postalCode: ''
  }
  errors: ICustomerErrors = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    phone2: null,
    postalCode: null
  }

  get hasErrors() {
    return Object.values(this.errors).filter(e => e != null).length > 0
  }

  trySubmit() {
    this.checkName('firstName', 'Nome')
    this.checkName('lastName', 'Sobrenome')
    this.checkEmail()
    this.checkPhone(0)
    if (this.data.phones[1].length) this.checkPhone(1)
    this.checkPostalCode()

    if (this.hasErrors) this.submit()
  }

  submit() {
    return true
  }

  checkName(key: string, name: string) {
    this.errors[key] = null

    if (!this.data[key].length)
      return (this.errors[key] = name + ' é obrigatório')

    if (this.data[key].length < 3)
      return (this.errors[key] = name + ' deve ter pelo menos 3 caracteres')

    const rgx = new RegExp(
      /[a-zzéúíóáèùìòàõãñêûîôâëyüïöäA-ZÉÚÍÓÁÈÙÌÒÀÕÃÑÊÛÎÔÂËYÜÏÖÄ]*/g
    )

    if (!rgx.test(this.data.firstName))
      this.errors.firstName = name + ' inválido'
  }

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

  checkPhone(n: number) {
    const key = !n ? 'phone' : 'phone2'
    this.errors[key] = null

    if (!n) {
      if (!this.data.phones[n].length)
        return (this.errors[key] = 'Telefone é obrigatório')
    }

    const rgx = new RegExp(/(\(\d{2}\))(\d{4,5}-\d{4})/)

    if (this.data.phones[n].length < 13 || !rgx.test(this.data.phones[n]))
      this.errors[key] = 'Telefone inválido'
  }

  checkPostalCode() {
    this.errors.postalCode = null

    if (!this.data.postalCode.length)
      return (this.errors.postalCode = 'CEP é obrigatório')

    const rgx = new RegExp(/\d{5}-\d{3}/)

    if (this.data.postalCode.length < 9 || !rgx.test(this.data.postalCode))
      this.errors.postalCode = 'CEP inválido'
  }
}
</script>

<style scoped lang="scss">
@import 'src/variables';
@import 'src/mixins';

.customer-form {
  &__tabs {
    height: 48px;
    border-bottom: 1px solid $light-gray;

    .tab {
      @include flex-centered;
      color: rgba(0, 0, 0, 0.38);
      font: 500 14px/1.14 'Inter';
      width: calc(100% / 3);
      height: 100%;
      position: relative;
      text-transform: uppercase;

      &.selected {
        color: $blue-violet;

        &:after {
          content: '';
          width: 100%;
          height: 2px;
          background-color: $blue-violet;
          position: absolute;
          bottom: -1px;
        }
      }
    }
  }

  &__wrapper {
    padding: 40px;
  }

  &__form {
    .form-control {
      height: 56px;
      font: 16px/1.5 $font-secondary;
      letter-spacing: 0.15px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 15px;
      border-color: rgba(0, 0, 0, 0.38);
      opacity: 0.7;

      &:disabled {
        background-color: white;
        opacity: 0.3;
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
