import Vue from 'vue'
import Vuex from 'vuex'
import Dashboard from './dashboard'
import Customers from './customers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dashboard: Dashboard,
    customers: Customers
  }
})
