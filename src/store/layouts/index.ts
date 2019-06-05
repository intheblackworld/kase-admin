import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    isDrawerOpen: true,
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
    toggleDrawer(state: { isDrawerOpen: boolean }) {
      state.isDrawerOpen = !state.isDrawerOpen
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
