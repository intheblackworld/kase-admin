import Vue from 'vue'
import Vuex from 'vuex'
import users from './store/users'
import layouts from './store/layouts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},

  modules: {
    users,
    layouts,
  },
})
