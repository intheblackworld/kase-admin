import Vue from 'vue'
import {
  getPositionType,
  getPositionTitle,
  getMineType,
  getPeriodType,
  getTrainingType,
  getQualificationType,
  getRewardType,
  getJobType,
  getLawsType,
  login,
  logout,
} from '@/http/apis'
import { stringify } from 'qs'

export default {
  namespaced: true,
  state: {
    options: {
      positionType: [], // 職別
      positionTitle: [], // 職稱
      mineType: [], // 礦場類別
      peridType: [],
    },
    token: '',
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
    toggleDrawer(state: { isDrawerOpen: boolean }) {
      state.isDrawerOpen = !state.isDrawerOpen
    },

    setOptions(state: { options: object }, payload: { key: string; data: [] }) {
      interface IParams {
        [key: string]: any
      }
      (state.options as IParams)[payload.key] = payload.data
    },

    setToken(state: { token: string }, token: string) {
      state.token = token
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

    async getMineType(context: any) {
      getMineType().then((data) => {
        context.commit('setOptions', { data, key: 'mineType' })
      })
    },

    async getTrainingType(context: any) {
      getTrainingType().then((data) => {
        context.commit('setOptions', { data, key: 'trainingType' })
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

    async getJobType(context: any) {
      getJobType().then((data) => {
        context.commit('setOptions', { data, key: 'jobType' })
      })
    },

    async login(context: any) {
      login().then((data: any) => {
        // 1. 沒有 token 就打這隻 API
        // 2. 回傳網址就轉址
        // 3. 回傳 token 就解析然後儲存
        if (data.url) {
          // window.location.href = data.url
        }
        if (data.token) {
          context.commit('setToken', data.token)
        }
      })
    },

    async logout(context: any) {
      logout().then((data: any) => {
        context.commit('setToken', '')
      })
    },
  },
}
