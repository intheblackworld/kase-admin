import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    name: 'manager',
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
    testMutations(state: { bal: any }, bal: any) {
      state.bal = bal
    },
  },

  actions: {
    // async getBal({ commit }, callback = () => {}) {
    //   Vue.http.post('user-balance-account/find-info').then(({ data }) => {
    //     const { list, currency_list } = data
    //     commit('setBal', list)
    //     commit('setState', { key: 'currencyList', value: currency_list })
    //     callback()
    //   })
    // },
  },
}
