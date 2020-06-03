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
      { name: 'HB20', image: '.jpg', score: 197 },
      { name: 'Onix', image: '.jpg', score: 183 },
      { name: 'Renegade', image: '.jpg', score: 125 },
      { name: 'T-Cross', image: '.jpg', score: 109 },
      { name: 'Kicks', image: '.jpg', score: 86 }
    ] as IMostDesired[]
  },
  getters: {},
  actions: {},
  mutations: {}
}
