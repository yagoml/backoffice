import Customers from '@/assets/customers.json'
import { IChecked, ICustomer } from '@/interfaces/customers'

export default {
  namespaced: true,
  state: {
    customers: Customers,
    checked: {} as IChecked
  },
  getters: {},
  actions: {
    toggleChecked({ commit }: any, id: string) {
      commit('toggleChecked', id)
    },
    setChecked({ commit }: any, params: any) {
      commit('setChecked', params)
    },
    checkAll({ commit }: any, params: any) {
      commit('checkAll', params)
    }
  },
  mutations: {
    setChecked(state: any, params: any) {
      const newChecked = { ...{}, ...state.checked }
      newChecked[params.id] = params.status
      state.checked = newChecked
    },
    toggleChecked(state: any, id: string) {
      const newChecked = { ...{}, ...state.checked }
      if (newChecked[id]) delete newChecked[id]
      else newChecked[id] = true
      state.checked = newChecked
    },
    checkAll(state: any, params: any) {
      if (params.status)
        params.customers.forEach((c: ICustomer) => {
          const newChecked = { ...{}, ...state.checked }
          newChecked[c.id] = params.status
          state.checked = newChecked
        })
      else state.checked = {}
    }
  }
}
