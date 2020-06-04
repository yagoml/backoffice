import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Customers from '../views/Customers.vue'
import AddCustomer from '../views/AddCustomer.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/add-customer',
    name: 'AddCustomer',
    component: AddCustomer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
