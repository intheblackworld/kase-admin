import { get, post } from './axios'

export const getPersonDetail = (employeeId: string) =>
  get(`api/person/${employeeId}`, {})

export const getExperience = (employeeId: string) =>
  get(`api/experience/${employeeId}`, {})

// options
export const getPositionType = () => get('/api/OptionPositionType', {})
export const getPositionTitle = () => get('/api/OptionPositionTitle', {})
export const getMineType = () => get('/api/OptionMineType', {})

export const getTrainingOptions = () => get('/api/OptionTrainingType', {})

export const getQualification = () => get('/api/OptionQualification', {})

export const getLaws = () => get('/api/OptionLegalBasis', {})
export const getReward = () => get('/api/OptionRewardType', {})
export const getJob = () => get('/api/OptionJobType', {})

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
