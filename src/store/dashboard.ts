import { IGadgetInfo, IMostDesired } from '@/interfaces/dashboard'

export default {
  namespaced: true,
  state: {
    gadgets: [
      {
        title: 'AVALIAÇÕES HOJE',
        value: 29,
        percent: 36,
        icon: 'car',
        since: 'desde ontem'
      },
      {
        title: 'CARROS PUBLICADOS',
        value: 397,
        percent: 4,
        icon: 'devices',
        since: 'este mês'
      },
      {
        title: 'TICKET MÉDIO DO ESTOQUE',
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
    ] as IMostDesired[]
  },
  getters: {},
  actions: {},
  mutations: {}
}
