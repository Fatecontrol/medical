import request from '@/utils/request'
import type { loginparamsRules, codeParams } from './types/user.d'
import type { User } from '@/types/user'
// 密码登录
export const loginByPassword = (loginParams: loginparamsRules) => {
  return request<User>('/login/password', 'POST', loginParams)
}
// 发送验证码
export const sendMobileCode = (codeParams: codeParams) => {
  return request<User>('/code', 'POST', codeParams)
}
