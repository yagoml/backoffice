import { IGadgetInfo } from '@/interfaces'

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
    ] as IGadgetInfo[]
  },
  getters: {},
  actions: {},
  mutations: {}
}
