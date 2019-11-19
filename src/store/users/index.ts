import Vue from 'vue'
import { search, create } from '@/http/apis'

export default {
  namespaced: true,
  state: {
    step: 1,
    search: {
      items: [],
      total: 0,
      isFetchLoading: false,
    },
    showSuccess: false,
    basic: {
      name: '',
      personStatus: null,
      personNo: '',
      cardNo: '',
      birthday: '',
      gender: null,
      deathDate: '',
      permanentAddress: '',
      mailingAddress: '',
      mobile: '',
      email: '',
      insuranceCompany: '',
      employeeResponseId: '',
      phones: [''],
      educationLevel: null,
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
        employeeResponseId: '',
        positionType: 0,
        isAgent: false,
        employmentNo: '',
        employmentDate: '',
        resignationNo: '',
        resignationDate: '',
        certificateNo: '',
        otherAttaches: [],
        otherAttachesName: '',
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
        employeeResponseId: '',
        isParticipate: false, // 參加與否
        years: '', // 年度(民國)
        periodType: null, // 期別 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
        customPeriod: null,
        trainingStart: '', // 訓練起始日期(西元)
        trainingEnd: '', // 訓練結束日期(西元)
        otherAttaches: [], // 附件上傳
        otherAttachesName: '', // 附件顯示名稱
        isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
      },
    ],

    qualifications: [
      {
        qualification: 0, // 資格類別
        certificateNo: '', // 證明書字號
        compliance: '', // 符合條款
        issueDate: '', // 發證日期(西元)
        otherAttaches: [], // 附件上傳
        qualificationFileName: '',
      },
    ],
    rewards: [
      {
        jobAttr: 0, // 職務屬性
        rewardType: 0, // 獎懲種類及額度
        legalBasis: 0, // 法令依據
        rewardDate: '', // 獎懲日期(西元)
        rewardDesc: 0, // 獎懲事實
        otherAttaches: [], // 附件上傳
        otherAttachesName: '', // 附件顯示名稱
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
      state: { search: { items: []; total: number; isFetchLoading: boolean } },
      data: { items: []; total: number },
    ) {
      const { items, total } = data
      state.search.items = items
      state.search.total = total
      state.search.isFetchLoading = false
    },

    createSuccess(state: { showSuccess: boolean; step: number }) {
      state.showSuccess = true
      state.step = 1
      setTimeout(() => {
        state.showSuccess = false
        window.location.reload()
      }, 1500)
    },

    setUserBasic(state: { basic: { phones: [] } }, data: any) {
      state.basic = Object.assign({}, state.basic, data)
      state.basic.phones = []
    },

    setUserEx(state: { incumbents: [] }, data: []) {
      state.incumbents = data
    },
    setUserTraining(state: { trainings: [] }, data: []) {
      state.trainings = data
    },

    setUserQu(state: { qualifications: [] }, data: []) {
      state.qualifications = data
    },

    setUserReward(state: { rewards: [] }, data: []) {
      state.rewards = data
    },

    addIncumbent(state: { incumbents: object[] }) {
      state.incumbents.push({
        organization: '',
        organizationId: '',
        subsidiary: '',
        mineType: 0,
        projectName: '',
        libraryNo: '',
        positionTitle: 0,
        positionType: 0,
        isAgent: false,
        employmentNo: '',
        employmentDate: '',
        resignationNo: '',
        resignationDate: '',
        certificateNo: '',
        otherAttaches: [],
        otherAttachesName: '',
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
        years: 0, // 年度(民國)
        isParticipate: false, // 參加與否
        periodType: 0, // 期別 4: 自訂期次 1, 5: 自訂期次 2, 6: 自訂期次 3 依此類推
        customPeriod: 0,
        trainingStart: '', // 訓練起始日期(西元)
        trainingEnd: '', // 訓練結束日期(西元)
        otherAttaches: [], // 附件上傳
        otherAttachesName: '', // 附件顯示名稱
        isShowCustomPeriodSelect: false, // 是否顯示自訂期次下拉選單
      })
    },

    deleteTraining(state: { trainings: object[] }) {
      state.trainings.pop()
    },
    addQualification(state: { qualifications: object[] }) {
      state.qualifications.push({
        qualification: 0, // 資格類別
        certificateNo: '', // 證明書字號
        compliance: '', // 符合條款
        issueDate: '', // 發證日期(西元)
        otherAttaches: [], // 附件上傳
        qualificationFileName: '',
      })
    },

    deleteQualification(state: { qualifications: object[] }) {
      state.qualifications.pop()
    },

    addReward(state: { rewards: object[] }) {
      state.rewards.push({
        jobAttr: 0, // 職務屬性
        rewardType: 0, // 獎懲種類及額度
        legalBasis: 0, // 法令依據
        rewardDate: '', // 獎懲日期(西元)
        rewardDesc: 0, // 獎懲事實
        otherAttaches: [], // 附件上傳
        otherAttachesName: '', // 附件顯示名稱
      })
    },

    deleteReward(state: { rewards: object[] }) {
      state.rewards.pop()
    },
  },

  actions: {
    async search(context: any, { ...props }) {
      context.state.search.isFetchLoading = true
      search({ ...props }).then((data) => {
        context.commit('fetchSearchData', data)
      })
    },

    async create(context: any, props: any) {
      // console.log(props)
      create(props).then((data: any) => {
        if (data.message) {
          window.alert(data.message)
        } else {
          context.commit('createSuccess', data)
        }
      })
    },
  },
}
