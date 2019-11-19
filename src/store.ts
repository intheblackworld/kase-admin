import Vue from 'vue'
import Vuex from 'vuex'
import users from './store/users'
import layouts from './store/layouts'

Vue.use(Vuex)

interface ILayoutState {
  options: {
    positionType: [], // 職別
    positionTitle: [], // 職稱
    mineType: [], // 礦場類別
    peridType: [],
  },
  token: string,
  info: object,
}

interface IState {
  layouts: ILayoutState
}

export default new Vuex.Store<IState>({
  mutations: {},
  actions: {},

  modules: {
    users,
    layouts,
  },
})
