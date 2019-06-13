import { get, post } from './axios'

export const getPersonDetail = (employeeId: string) =>
  get(`api/person/${employeeId}`, {})

export const getExperience = (employeeId: string) =>
  get(`api/experience/${employeeId}`, {})

export const getTrainingOptions = () => get('/api/OptionTrainingType', {})

export const getPositionType = () => get('/api/OptionPositionType', {})
export const getPositionTitle = () => get('/api/OptionPositionTitle', {})
export const getMineType = () => get('/api/MineType', {})

export const getQualification = () => get('/api/OptionQualification', {})

export const getLaws = () => get('/api/OptionLegalBasis', {})
export const getReward = () => get('/api/OptionRewardType', {})
export const getJob = () => get('/api/OptionJobType', {})

export const create = (data: object) => post('/api/person/insert', data)

export const search = (req: object) => post(`api/person/search`, req)
