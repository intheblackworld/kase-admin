import Vue from 'vue'
import { search, create } from '@/http/apis'
import { positionTitleList } from '@/utils/options'

export default {
  namespaced: true,
  state: {
    step: 1,
    search: {
      items: [],
      total: 0,
    },
    showSuccess: false,
    basic: {
      name: '',
      personStatus: 0,
      personNo: '',
      cardNo: '',
      birthday: '',
      gender: 0,
      deathDate: '',
      permanentAddress: '',
      mailingAddress: '',
      mobile: '',
      email: '',
      phones: [''],
      educationLevel: 0,
      educationOther: '',
      insuranceNo: '',
      insuranceDate: '',
      identityAttaches: [],
      educationAttaches: [],
      otherAttaches: [],
      remark: '',
    },

    incumbents: [
      {
        organization: '',
        subsidiary: '',
        mineType: 0,
        projectName: '',
        libraryNo: '',
        positionTitle: 0,
        positionType: 0,
        employmentNo: '',
        employmentStart: '',
        employmentEnd: '',
        resignationNo: '',
        resignationStart: '',
        resignationEnd: '',
        certificateNo: '',
        incumbentFile: [],
        incumbentFileName: '',
        isShowIncumbentPositionTitle: false,
      },
    ],

    trainings: [
      {
        organization: '', // 任職單位
        subsidiary: '', // 附屬單位
        positionTrainingType: 0, // 課程種類
        mineType: 0, // 礦場類別
        trainingType: 0, // 訓練課程類別
        years: 0, // 年度
        periodType: 0, // 期別 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
        customPeriod: 0,
        trainingStart: '', // 訓練起始日期
        trainingEnd: '', // 訓練結束日期
        trainingFile: [], // 附件上傳
        trainingFileName: '', // 附件顯示名稱
        isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
      },
    ],

    qualifications: [
      {
        qualificationCategory: 0, // 資格類別
        certificateNo: '', // 證明書字號
        compliance: '', // 符合條款
        issueDate: '', // 發證日期
        qualificationFile: [], // 附件上傳
        qualificationFileName: '',
      },
    ],
    rewards: [
      {
        jobAttrType: 0, // 職務屬性
        rewardType: 0, // 獎懲種類及額度
        legalBasisType: 0, // 法令依據
        rewardDate: '', // 獎懲日期
        rewardDesc: '', // 獎懲事實
        rewardFile: [], // 附件上傳
        rewardFileName: '', // 附件顯示名稱
      },
    ],
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
    handleStep(state: { step: number }, page: number) {
      state.step = page
    },

    addPhone(state: { basic: { phones: string[] } }) {
      state.basic.phones.push('')
    },

    fetchSearchData(
      state: { search: { items: []; total: number } },
      data: { items: []; total: number },
    ) {
      const { items, total } = data
      items.forEach((item: { position: any }) => {
        item.position = positionTitleList[item.position].text
      })
      state.search.items = items
      state.search.total = total
    },

    createSuccess(state: { showSuccess: boolean }) {
      state.showSuccess = true
      setTimeout(() => {
        state.showSuccess = false
      }, 1500)
    },

    getUserBasic(state: { basic: { phones: [] } }, data: any) {
      state.basic = Object.assign({}, state.basic, data)
      state.basic.phones = []
    },

    addIncumbent(state: { incumbents: object[] }) {
      state.incumbents.push({
        organization: '',
        subsidiary: '',
        mineType: 0,
        projectName: '',
        libraryNo: '',
        positionTitle: 0,
        positionType: 0,
        employmentNo: '',
        employmentStart: '',
        employmentEnd: '',
        resignationNo: '',
        resignationStart: '',
        resignationEnd: '',
        certificateNo: '',
        incumbentFile: [],
        incumbentFileName: '',
        isShowIncumbentPositionTitle: false,
      })
    },

    deleteIncumbent(state: { incumbents: object[] }) {
      state.incumbents.pop()
    },

    addTraining(state: { trainings: object[] }) {
      state.trainings.push({
        organization: '', // 任職單位
        subsidiary: '', // 附屬單位
        positionTrainingType: 0, // 課程種類
        mineType: 0, // 礦場類別
        trainingType: 0, // 訓練課程類別
        years: 0, // 年度
        periodType: 0, // 期別 4: 自訂期次 1, 5: 自訂期次 2, 6: 自訂期次 3 依此類推
        customPeriod: 0,
        trainingStart: '', // 訓練起始日期
        trainingEnd: '', // 訓練結束日期
        trainingFile: [], // 附件上傳
        trainingFileName: '', // 附件顯示名稱
        isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
      })
    },

    deleteTraining(state: { trainings: object[] }) {
      state.trainings.pop()
    },
    addQualification(state: { qualifications: object[] }) {
      state.qualifications.push({
        qualificationCategory: 0, // 資格類別
        certificateNo: '', // 證明書字號
        compliance: '', // 符合條款
        issueDate: '', // 發證日期
        qualificationFile: [], // 附件上傳
        qualificationFileName: '',
      })
    },

    deleteQualification(state: { qualifications: object[] }) {
      state.qualifications.pop()
    },

    addReward(state: { rewards: object[] }) {
      state.rewards.push({
        jobAttrType: 0, // 職務屬性
        rewardType: 0, // 獎懲種類及額度
        legalBasisType: 0, // 法令依據
        rewardDate: '', // 獎懲日期
        rewardDesc: '', // 獎懲事實
        rewardFile: [], // 附件上傳
        rewardFileName: '', // 附件顯示名稱
      })
    },

    deleteReward(state: { rewards: object[] }) {
      state.rewards.pop()
    },
  },

  actions: {
    async search(context: any, { ...props }) {
      search({ ...props }).then((data) => {
        context.commit('fetchSearchData', data)
      })
    },

    async create(context: any, { ...props }) {
      create({ ...props }).then((data: any) => {
        context.commit('createSuccess', data)
      })
    },
  },
}
