import { get, post } from './axios'

// 人員資料頁
export const getBasic = (employeeId: string) =>
  get(`api/person/${employeeId}`, {})
export const updateUserBasic = (data: object) =>
  post('/api/person/insertBasicInfo', data)

// 任職紀錄
export const getExperience = (employeeId: string) =>
  get(`api/experience/${employeeId}`, {})
export const createExperience = (data: object) =>
  post('/api/experience/insert', data)
export const deleteExperience = (data: object) =>
  post('/api/experience/delete', data)

// 訓練記錄
export const getTraining = (employeeId: string) =>
  get(`api/training/${employeeId}`, {})
export const createTraining = (data: object) =>
  post('/api/training/insert', data)
export const deleteTraining = (data: object) =>
  post('/api/training/delete', data)

// 資格證照紀錄
export const getQualification = (employeeId: string) =>
  get(`api/qualification/${employeeId}`, {})
export const createQualification = (data: object) =>
  post('/api/qualification/insert', data)
export const deleteQualification = (data: object) =>
  post('/api/qualification/delete', data)

// 獎懲紀錄
export const getReward = (employeeId: string) =>
  get(`api/reward/${employeeId}`, {})
export const createReward = (data: object) => post('/api/reward/insert', data)
export const deleteReward = (data: object) => post('/api/reward/delete', data)

// 編修紀錄
export const getLog = (data: object) => post('/api/editingLog/search', data)
export const getPersonDiff = (id: string) => get(`/api/person/diff/${id}`, {})
export const getIncumbentDiff = (id: string) =>
  get(`/api/experience/diff/${id}`, {})
export const getTrainingDiff = (id: string) =>
  get(`/api/training/diff/${id}`, {})
export const getQualificationDiff = (id: string) =>
  get(`/api/qualification/diff/${id}`, {})
export const getRewardDiff = (id: string) => get(`/api/reward/diff/${id}`, {})

// options
export const getPositionType = () => get('/api/OptionPositionType', {})
export const getPositionTitle = () =>
  get('/api/OptionPositionTitle_NoExplosive', {})
export const getPositionTitleForSearch = () =>
  get('/api/OptionPositionTitle', {})
export const getMineType = () => get('/api/OptionMineType', {})
export const getEducationLevel = () => get('/api/OptionEducationLevel', {})
export const getGender = () => get('/api/OptionGender', {})

export const getTrainingType = () => get('/api/OptionTrainingType', {})
export const getPersonStatus = () => get('/api/OptionPersonStatus', {})

export const getPeriodType = () => get('/api/OptionPeriodType', {})

export const getQualificationType = () => get('/api/OptionQualification', {})

export const getLawsType = () => get('/api/OptionLegalBasis', {})
export const getLawsDescType = () => get('/api/RewardDesc', {})
export const getRewardType = () => get('/api/OptionRewardType', {})
export const getJobType = () => get('/api/OptionJobType_NoExplosive', {})
export const getJobTypeForSearch = () => get('/api/OptionJobType', {})

export const getEditType = () => get('/api/OptionEditingCategory', {})

export const create = (data: any) => post('/api/person/insert', data)

export const search = (req: object) => post(`api/person/search`, req)

// const authUrl = 'https://www.kase.com.tw/MOEA_Auth/'
// const authUrl = 'https://mims.mine.gov.tw/AuthService/'
// const outerUrl = 'https://www.kase.com.tw/MOEA_MIMS/'
// const outerUrl = 'https://mims.mine.gov.tw/MineMIMSBackend/'
const devApi = 'https://www.kase.com.tw/MOEA_Auth/'
const prdApi = 'https://mims.mine.gov.tw/AuthService/'
const devOuterApi = 'https://www.kase.com.tw/MOEA_MIMS/'
const prdOuterApi = 'https://mims.mine.gov.tw/MineMIMSBackend/'


const authUrl = process.env.NODE_ENV === 'development' ? devApi : prdApi
const outerUrl = process.env.NODE_ENV === 'development' ? devOuterApi : prdOuterApi

export const login = () =>
  // axios.post(`${authUrl}api/Login/`, {
  //   'returnUrl': `${location.href}`,
  //   })
  post(`${authUrl}api/login/`, {
    'nameid': 'aallom4j',
    'given_name': 'Adriena Allom',
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': [
      'Billboard.Manage',
      'Permission.Manage',
      'People.Manage',
      'People.Search',
    ],
    'exp': 1560346273,
    'iss': 'MOAE',
    'aud': 'Auth',
    'returnUrl': `${location.href}`,
  })

// export const loginK = () =>
//   post(`${authUrl}api/Login/`, { returnUrl: location.href })
export const logout = () =>
  get(`${authUrl}api/logout/`, {})

export const getOuterData = () =>
  post(`${outerUrl}api/mining-area-to-people`, {})

// 檢驗卡號身分證
export const hasCardNo = (cardNo: string, employeeId: string) =>
  post('/api/person/hasCardNo', { cardNo, employeeId })

export const hasPersonNo = (personNo: string, employeeId: string) =>
  post('/api/person/hasPersonNo', { personNo, employeeId })


export const report = (data: object, url: string) =>
  post(`/api/Report/${url}`, data)
