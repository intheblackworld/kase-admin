import Vue from 'vue'
import {
  getPositionType,
  getPositionTitle,
  getPositionTitleForSearch,
  getMineType,
  getEducationLevel,
  getGender,
  getPeriodType,
  getTrainingType,
  getPersonStatus,
  getQualificationType,
  getRewardType,
  getJobType,
  getJobTypeForSearch,
  getLawsType,
  getLawsDescType,
  getEditType,
  getOuterData,
  login,
  logout,
} from '@/http/apis'
import { stringify } from 'qs'
const jwtDecode = require('jwt-decode')

export default {
  namespaced: true,
  state: {
    options: {
      positionType: [], // 職別
      positionTitle: [], // 職稱
      mineType: [], // 礦場類別
      peridType: [],
      outer: {
        items: [],
        total: 0,
      },
      rewardType: [],
      jobType: [],
      lawsType: [],
      lawsDescType: [],
    },
    token: '',
    info: {},
    isDrawerOpen: false,
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],

    isManager: (state: { info: any }) =>
      state.info[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] &&
      state.info[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ].includes('People.Manage'),
  },

  mutations: {
    toggleDrawer(state: { isDrawerOpen: boolean }) {
      state.isDrawerOpen = !state.isDrawerOpen
    },

    setOptions(state: { options: object }, payload: { key: string; data: [] }) {
      interface IParams {
        [key: string]: any
      }
      ; (state.options as IParams)[payload.key] = payload.data
    },

    setToken(state: { token: string }, token: string) {
      state.token = token
    },

    setLoginInfo(state: any, info: any) {
      state.info = info
    },
  },

  actions: {
    async getPositionType(context: any) {
      getPositionType().then((data) => {
        context.commit('setOptions', { data, key: 'positionType' })
      })
    },

    async getPositionTitle(context: any) {
      getPositionTitle().then((data) => {
        context.commit('setOptions', { data, key: 'positionTitle' })
      })
    },

    async getPositionTitleForSearch(context: any) {
      getPositionTitleForSearch().then((data) => {
        context.commit('setOptions', { data, key: 'positionTitle' })
      })
    },

    async getMineType(context: any) {
      getMineType().then((data) => {
        context.commit('setOptions', { data, key: 'mineType' })
      })
    },

    async getEducationLevel(context: any) {
      getEducationLevel().then((data) => {
        context.commit('setOptions', { data, key: 'educationLevel' })
      })
    },

    async getGender(context: any) {
      getGender().then((data) => {
        context.commit('setOptions', { data, key: 'gender' })
      })
    },

    async getTrainingType(context: any) {
      getTrainingType().then((data) => {
        context.commit('setOptions', { data, key: 'trainingType' })
      })
    },
    async getPersonStatus(context: any) {
      getPersonStatus().then((data) => {
        context.commit('setOptions', { data, key: 'personStatus' })
      })
    },

    async getPeriodType(context: any) {
      getPeriodType().then((data) => {
        context.commit('setOptions', { data, key: 'periodType' })
      })
    },

    async getQualificationType(context: any) {
      getQualificationType().then((data) => {
        context.commit('setOptions', { data, key: 'qualificationType' })
      })
    },

    async getRewardType(context: any) {
      getRewardType().then((data) => {
        context.commit('setOptions', { data, key: 'rewardType' })
      })
    },

    async getLawsType(context: any) {
      getLawsType().then((data) => {
        context.commit('setOptions', { data, key: 'lawsType' })
      })
    },

    async getLawsDescType(context: any) {
      getLawsDescType().then((data) => {
        context.commit('setOptions', { data, key: 'lawsDescType' })
      })
    },

    async getJobType(context: any) {
      getJobType().then((data) => {
        context.commit('setOptions', { data, key: 'jobType' })
      })
    },

    async getJobTypeForSearch(context: any) {
      getJobTypeForSearch().then((data) => {
        context.commit('setOptions', { data, key: 'jobType' })
      })
    },

    async getEditType(context: any) {
      getEditType().then((data) => {
        context.commit('setOptions', { data, key: 'editType' })
      })
    },

    async login(context: any) {
      login().then((data: any) => {
        // 1. 沒有 token 就打這隻 API
        // 2. 回傳網址就轉址
        // 3. 回傳 token 就解析然後儲存
        const token = data.token
        // const token
        if (token) {
          const decode = jwtDecode(token)
          // console.log(context)
          context.commit('setToken', token)
          context.commit('setLoginInfo', decode) // 拿到權限
          const authList = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          if (!authList.includes('People.Search') && !authList.includes('People.Manage')) {
            window.location.href = 'https://www.kase.com.tw/MOEA_Auth/Main'
          }

          context.dispatch('getEditType') // 編修總類
          context.dispatch('getEducationLevel') // 學歷選項
          context.dispatch('getGender') // 性別選項
          context.dispatch('getJobType') // 職務屬性
          context.dispatch('getLawsType') // 法令依據
          context.dispatch('getLawsDescType') // 獎懲事實
          context.dispatch('getMineType') // 礦場類別
          context.dispatch('getPeriodType') // 期別選項
          context.dispatch('getPersonStatus') // 身份註記
          context.dispatch('getPositionTitle') // 職稱選項
          context.dispatch('getPositionType') // 職別選項
          context.dispatch('getQualificationType') // 資格類別選項
          context.dispatch('getRewardType') // 獎懲種類及額度
          context.dispatch('getTrainingType') // 訓練課程類別
          context.dispatch('getOuterData')
          return
        }
        if (data.url) {
          window.location.href = data.url
          return
        }
      })
    },

    async logout(context: any) {
      logout().then((data: any) => {
        context.commit('setToken', '')
        window.location.reload()
      })
    },
    async getOuterData(context: any) {
      getOuterData().then((data) => {
        context.commit('setOptions', { data, key: 'outer' })
      })
    },
  },
}
