import { IGadgetInfo, IMostDesired } from '@/interfaces/dashboard'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    gadgets: [
      {
        title: 'Avaliações hoje',
        value: 29,
        percent: 36,
        icon: 'car',
        since: 'desde ontem'
      },
      {
        title: 'Carros publicados',
        value: 397,
        percent: 4,
        icon: 'devices',
        since: 'este mês'
      },
      {
        title: 'Ticket médio do estoque',
        value: 'R$ 42.567',
        percent: -6,
        icon: 'dollar',
        since: 'este mês'
      }
    ] as IGadgetInfo[],
    mostDesired: [
      { name: 'T-Cross', image: '/brands/volkswagen.png', score: 109 },
      { name: 'Kicks', image: '/brands/nissan.png', score: 86 },
      { name: 'Onix', image: '/brands/chevrolet.png', score: 183 },
      { name: 'Renegade', image: '/brands/jeep.png', score: 125 },
      { name: 'HB20', image: '/brands/hyundai.png', score: 197 }
    ] as IMostDesired[],
    vehicles: []
  },
  getters: {},
  actions: {
    async getVehicles({ commit }) {
      try {
        return axios
          .get('http://www.mocky.io/v2/5eb553df31000060006994a8')
          .then(response => {
            commit('setVehicles', response.data)
          })
      } catch (e) {
        console.error(e)
      }
    }
  },
  mutations: {
    setVehicles(state, vehicles) {
      state.vehicles = vehicles
    }
  }
}
