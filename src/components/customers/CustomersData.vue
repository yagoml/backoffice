<template>
  <div class="customers-data">
    <CustomersActions
      :search="search"
      :lead-filter="leadFilter"
      @search="searchTerms"
      @setFilter="setFilter"
      @tryRemoveSeveral="tryRemoveSeveral"
    />
    <div v-if="customersFiltered.length" class="bo-container">
      <CustomersTable
        :customers="customersFiltered"
        :all-checked-state="allChecked"
        @tryDelete="tryDelete"
        @edit="edit"
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
  search = '' // search terms
  allChecked = false // all checked?
  customers: ICustomer[] = [] // Customers current page list
  leadFilter = '' // Filter applied (l: lead | c: customer)
  perPage = 10 // items per page
  page = 1 // current page
  startItem = 1 // first index of page
  finishItem = 1 * this.perPage // last index of page
  totalItems = 0 // total of items
  totalPages = 0 // total of pages
  lsData: ICustomer[] = [] // localstorage data

  /**
   * First index of customer on page.
   * @returns Customer index.
   */
  get startIndex(): number {
    return (this.page - 1) * this.perPage
  }

  /**
   * Checked customers.
   */
  get checked() {
    return this.$store.state.customers.checked
  }

  /**
   * Computed customers filtered.
   * @returns Customer filtered list.
   */
  get customersFiltered(): ICustomer[] {
    const customers = this.lsData.filter((c: ICustomer) => {
      if (this.leadFilter.length) {
        const lead = this.leadFilter === 'l'
        if ((lead && !c.lead) || (!lead && c.lead)) return false
      }
      return c.name.toLowerCase().match(this.search.toLowerCase())
    })
    this.setPaginationData(customers.length)
    return customers.splice(this.startIndex, this.perPage)
  }

  /**
   * Total of selected customers.
   */
  get selectedLen(): number {
    return Object.values(this.checked).filter(c => c).length
  }

  created() {
    this.tryLoadJsonData()
    this.initData()
  }

  mounted() {
    document.documentElement.scrollTop = 0
  }

  /**
   * Set initial data.
   */
  initData() {
    this.lsData = this.getLsData()
    this.customers = this.lsData
    this.totalItems = this.customers.length
    this.totalPages = Math.ceil(this.lsData.length / this.perPage)
  }

  /**
   * Get localstorage data.
   */
  getLsData(): ICustomer[] {
    return JSON.parse(localStorage.getItem('customersData') || '')
  }

  /**
   * Load initial data of json file.
   */
  tryLoadJsonData() {
    if (localStorage.getItem('customersData')) return
    localStorage.setItem(
      'customersData',
      JSON.stringify(this.$store.state.customers.customers)
    )
  }

  /**
   * Set/update filters.
   * @param type Filter selected (customer type).
   */
  setFilter(type: string) {
    this.page = 1
    this.leadFilter = type
  }

  /**
   * Set/update the pagination info.
   * @param total Total of stored customers.
   */
  setPaginationData(total: number) {
    this.startItem = this.startIndex + 1
    this.finishItem = this.startIndex + this.perPage
    if (this.finishItem > total) this.finishItem = total
    this.totalItems = total
    this.totalPages = Math.ceil(total / this.perPage)
  }

  /**
   * Go to item edition.
   * @param id Customer identifier.
   */
  edit(id: string) {
    this.$router.push({
      path: '/customer-form',
      query: { id: id }
    })
  }

  /**
   * Set terms for search.
   * @param terms Search terms.
   */
  searchTerms(terms: string) {
    this.page = 1
    this.search = terms
  }

  /**
   * Set items per page.
   * @param value Per page quantity.
   */
  setPerPage(value: number) {
    this.perPage = value
  }

  /**
   * Get customer data by id.
   * @param id Customer id
   */
  getDataById(id: string) {
    return this.lsData.find(d => d.id === id)
  }

  /**
   * Confirm customer exclusion.
   * @param id Customer identifier.
   */
  tryDelete(id: string) {
    const data = this.getDataById(id)
    if (!data) return
    const name = data.name.split(' ')[0]
    const confirm = window.confirm(
      `Excluir o cliente ${name}? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    this.delete(id)
    this.updateLsData()
    this.checkPage()
  }

  /**
   * Check for empty page, if empty, back one page.
   */
  checkPage() {
    this.totalPages = Math.ceil(this.lsData.length / this.perPage)
    if (this.page > this.totalPages) {
      this.page--
      this.lsData = this.getLsData()
    }
  }

  /**
   * Delete a customer.
   * @param id Customer identifier.
   */
  delete(id: string) {
    const index = this.lsData.findIndex(d => d.id === id)
    if (index < 0) return
    this.lsData.splice(index, 1)
    this.setChecked(id, false)
  }

  /**
   * Check/uncheck customer
   * @param id Customer id
   * @param status check?
   */
  setChecked(id: string, status: boolean) {
    this.$store.dispatch('customers/setChecked', {
      id: id,
      status: status
    })
  }

  /**
   * Update localstorage data.
   */
  updateLsData() {
    localStorage.setItem('customersData', JSON.stringify(this.lsData))
  }

  /**
   * Remove multiple selected customers.
   */
  tryRemoveSeveral() {
    const confirm = window.confirm(
      `Excluir os ${this.selectedLen} clientes selecionados? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    const lsCopy: ICustomer[] = [...[], ...this.lsData]
    this.customers = lsCopy.filter((d: ICustomer) => {
      return !this.checked[d.id]
    })
    localStorage.setItem('customersData', JSON.stringify(this.customers))
    this.totalPages = Math.ceil(this.customers.length / this.perPage)
    if (this.page > this.totalPages) this.page--
    this.lsData = this.getLsData()
    this.$store.dispatch('customers/checkAll', this.customers)
  }

  /**
   * Change table page.
   * @param prev Prev `true` return to prev page, otherwise go to next.
   */
  changePage(prev: boolean | null) {
    if (!prev) {
      const totalPages = Math.ceil(this.lsData.length / this.perPage)
      if (this.page >= totalPages) return
      this.page++
    } else {
      if (this.page < 2) return
      this.page--
    }
    this.setPaginationData(this.lsData.length)
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
