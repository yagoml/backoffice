<template>
  <div class="customers-data">
    <CustomersActions
      :search="search"
      :selected="selected"
      :lead-filter="leadFilter"
      @search="searchTerms"
      @setFilter="setFilter"
    />
    <div v-if="customersFiltered.length" class="bo-container">
      <CustomersTable
        :customers="customersFiltered"
        :checked-list="checked"
        @tryDelete="tryDelete"
      />
      <TablePagination
        :per-page="perPage"
        :start-item="startItem"
        :finish-item="finishItem"
        :total-items="totalItems"
        :page="page"
        :total-pages="totalPages"
        @setPerPage="setPerPage"
        @changePage="changePage"
      />
    </div>
    <b-alert v-else show variant="warning customers-data__empty">
      Nenhum cliente encontrado com o(s) termo(s) pesquisados.
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICustomer } from '@/interfaces/customers'
import CustomersActions from '@/components/customers/CustomersActions.vue'
import CustomersTable from '@/components/customers/CustomersTable.vue'
import TablePagination from '@/components/TablePagination.vue'

@Component<CustomersData>({
  components: {
    CustomersActions,
    CustomersTable,
    TablePagination
  }
})
export default class CustomersData extends Vue {
  search = ''
  checked: number[] = []
  allChecked = false
  customers: ICustomer[] = []
  leadFilter = ''
  perPage = 5
  page = 1
  startItem = 1
  finishItem = 1 * this.perPage
  totalItems = 0
  totalPages = 0
  lsData: ICustomer[] = []

  get selected(): number[] {
    return this.checked.filter(c => c !== null)
  }

  get startIndex(): number {
    return (this.page - 1) * this.perPage
  }

  get customersFiltered(): ICustomer[] {
    const customers = this.lsData.filter((c: ICustomer) => {
      if (this.leadFilter.length) {
        const val = this.leadFilter === 'l'
        if (val && !c.lead) return false
        if (!val && c.lead) return false
      }
      return c.name.toLowerCase().match(this.search.toLowerCase())
    })
    this.setPaginationData(customers)
    return customers.splice(this.startIndex, this.perPage)
  }

  created() {
    this.tryLoadJsonData()
    this.initData()
  }

  initData() {
    this.lsData = this.getLsData()
    this.customers = this.lsData
    this.totalItems = this.customers.length
    this.totalPages = Math.ceil(this.lsData.length / this.perPage)
  }

  getLsData(): ICustomer[] {
    return JSON.parse(localStorage.getItem('customersData') || '')
  }

  tryLoadJsonData() {
    if (localStorage.getItem('customersData')) return
    localStorage.setItem(
      'customersData',
      JSON.stringify(this.$store.state.customers.customers)
    )
  }

  setFilter(type: string) {
    this.leadFilter = type
  }

  setPaginationData(data: ICustomer[]) {
    this.startItem = this.startIndex + 1
    this.finishItem = this.startIndex + this.perPage
    if (this.finishItem > data.length) this.finishItem = data.length
    this.totalItems = data.length
    this.totalPages = Math.ceil(data.length / this.perPage)
  }

  searchTerms(terms: string) {
    this.search = terms
  }

  checkAll() {
    this.checked = []
    if (this.allChecked) {
      this.customersFiltered.forEach((c: ICustomer, i: number) => {
        this.checked.push(i)
      })
    }
  }

  setPerPage(value: number) {
    this.perPage = value
  }

  mounted() {
    document.documentElement.scrollTop = 0
  }

  tryDelete(index: number) {
    const name = this.lsData[index].name.split(' ')[0]
    const confirm = window.confirm(
      `Excluir o cliente ${name}? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    this.delete(index)
  }

  delete(index: number) {
    this.lsData.splice(index, 1)
    localStorage.setItem('customersData', JSON.stringify(this.lsData))
    this.totalPages = Math.ceil(this.lsData.length / this.perPage)
    if (this.page > this.totalPages) {
      this.page--
      this.lsData = this.getLsData()
    }
  }

  tryRemoveSeveral() {
    const confirm = window.confirm(
      `Excluir os ${this.selected.length} clientes selecionados? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    const lsCopy: ICustomer[] = [...[], ...this.lsData]
    this.customers = lsCopy.filter((d: ICustomer, i: number) => {
      return !this.selected.includes(i)
    })
    localStorage.setItem('customersData', JSON.stringify(this.customers))
    this.totalPages = Math.ceil(this.customers.length / this.perPage)
    if (this.page > this.totalPages) this.page--
    this.lsData = this.getLsData()
    this.checked = []
    this.allChecked = false
  }

  changePage(prev: boolean | null) {
    if (!prev) {
      const totalPages = Math.ceil(this.lsData.length / this.perPage)
      if (this.page >= totalPages) return
      this.page++
    } else {
      if (this.page < 2) return
      this.page--
    }
    this.setPaginationData(this.lsData)
    const pageData = [...[], ...this.lsData]
    this.customers = pageData.splice(this.startIndex, this.perPage)
  }
}
</script>

<style scoped lang="scss">
.customers-data {
  &__empty {
    width: fit-content;
  }
}
</style>
