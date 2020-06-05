import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Customers from '../views/Customers.vue'
import AddCustomer from '../views/AddCustomer.vue'
import Vehicles from '../views/Vehicles.vue'

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
    path: '/customer-form',
    name: 'AddCustomer',
    component: AddCustomer
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
