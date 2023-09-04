import request from '@/utils/request'
import type { codeTypeRules } from './types/user.d'
import type { User, Code, UserInfo, PatientType } from '@/types/user'
// 密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}
// 发送验证码
export const sendMobileCode = (mobile: string, type: codeTypeRules) => {
  return request<Code>('/code', 'GET', { mobile, type })
}
// 验证码登录
export const loginByCode = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}
// 获取个人信息
export const getUserInfo = () => {
  return request<UserInfo>('/patient/myUser', 'GET')
}
// 查询患者详情
export const getPatientDetail = (id: string) => request<PatientType>(`/patient/info/${id}`)
