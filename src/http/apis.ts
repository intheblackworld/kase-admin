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
export const createReward = (data: object) =>
  post('/api/reward/insert', data)
export const deleteReward = (data: object) =>
  post('/api/reward/delete', data)

// options
export const getPositionType = () => get('/api/OptionPositionType', {})
export const getPositionTitle = () => get('/api/OptionPositionTitle', {})
export const getMineType = () => get('/api/OptionMineType', {})

export const getTrainingType = () => get('/api/OptionTrainingType', {})

export const getPeriodType = () => get('/api/OptionPeriodType', {})


export const getQualificationType = () => get('/api/OptionQualification', {})

export const getLawsType = () => get('/api/OptionLegalBasis', {})
export const getRewardType = () => get('/api/OptionRewardType', {})
export const getJobType = () => get('/api/OptionJobType', {})

export const create = (data: object) => post('/api/person/insert', data)

export const search = (req: object) => post(`api/person/search`, req)

export const login = () =>
  post('https://www.kase.com.tw/MOEA_Auth/api/login/', {
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
  })

export const logout = () =>
  get('https://www.kase.com.tw/MOEA_Auth/api/logout/', {})
