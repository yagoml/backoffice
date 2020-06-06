<template>
  <div class="customers-data">
    <CustomersActions
      :search="search"
      :selected="selected"
      :lead-filter="leadFilter"
      @search="searchTerms"
      @setFilter="setFilter"
      @tryRemoveSeveral="tryRemoveSeveral"
    />
    <div v-if="customersFiltered.length" class="bo-container">
      <CustomersTable
        :customers="customersFiltered"
        :checked="checked"
        :all-checked-state="allChecked"
        @tryDelete="tryDelete"
        @toggleChecked="toggleChecked"
        @toggleCheckAll="toggleCheckAll"
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
  checked: number[] = [] // list of selected customers
  allChecked = false // all checked?
  customers: ICustomer[] = [] // Customers current page list
  leadFilter = '' // Filter applied (l: lead | c: customer)
  perPage = 5 // items per page
  page = 1 // current page
  startItem = 1 // first index of page
  finishItem = 1 * this.perPage // last index of page
  totalItems = 0 // total of items
  totalPages = 0 // total of pages
  lsData: ICustomer[] = [] // localstorage data

  /**
   * List of selected customers.
   * @returns Customer indexes list.
   */
  get selected(): number[] {
    return this.checked.filter(c => c !== null)
  }

  /**
   * First index of customer on page.
   * @returns Customer index.
   */
  get startIndex(): number {
    return (this.page - 1) * this.perPage
  }

  /**
   * Computed customers filtered.
   * @returns Customer filtered list.
   */
  get customersFiltered(): ICustomer[] {
    const customers = this.lsData.filter((c: ICustomer) => {
      if (this.leadFilter.length) {
        const lead = this.leadFilter === 'l'
        if (lead !== c.lead) return false
      }
      return c.name.toLowerCase().match(this.search.toLowerCase())
    })
    this.setPaginationData(customers.length)
    return customers.splice(this.startIndex, this.perPage)
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
   * Toggle all checkboxes selection.
   * @param value Check or not.
   */
  toggleCheckAll(value: boolean) {
    this.allChecked = value
    this.checkAll()
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
   * Toggle checkbox selection.
   * @param checked Checked list.
   */
  toggleChecked(checked: number[]) {
    this.checked = checked
  }

  /**
   * Set/update filters.
   * @param type Filter selected (customer type).
   */
  setFilter(type: string) {
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
   * Get a real index of customer data.
   * @param pageIndex Index on current page.
   */
  getDataIndex(pageIndex: number): number {
    let index = pageIndex
    if (this.page > 1) index += (this.page - 1) * this.perPage
    return index
  }

  /**
   * Go to item edition.
   * @param index Customer identifier.
   */
  edit(index: number) {
    const dataIndex = this.getDataIndex(index)

    this.$router.push({
      path: '/customer-form',
      query: { index: dataIndex.toString() }
    })
  }

  /**
   * Set terms for search.
   * @param terms Search terms.
   */
  searchTerms(terms: string) {
    this.search = terms
  }

  /**
   * Check all checkboxes of current table page.
   */
  checkAll() {
    this.checked = []
    if (this.allChecked) {
      this.customersFiltered.forEach((c: ICustomer, i: number) => {
        this.checked.push(i)
      })
    }
  }

  /**
   * Set items per page.
   * @param value Per page quantity.
   */
  setPerPage(value: number) {
    this.perPage = value
  }

  /**
   * Confirm customer exclusion.
   * @param index Customer identifier.
   */
  tryDelete(index: number) {
    const name = this.lsData[index].name.split(' ')[0]
    const confirm = window.confirm(
      `Excluir o cliente ${name}? Esta ação não poderá ser desfeita!`
    )
    if (!confirm) return
    this.delete(index)
  }

  /**
   * Delete a customer.
   * @param index Customer identifier.
   */
  delete(index: number) {
    this.lsData.splice(index, 1)
    localStorage.setItem('customersData', JSON.stringify(this.lsData))
    this.totalPages = Math.ceil(this.lsData.length / this.perPage)
    if (this.page > this.totalPages) {
      this.page--
      this.lsData = this.getLsData()
    }
  }

  /**
   * Remove multiple selected customers.
   */
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
