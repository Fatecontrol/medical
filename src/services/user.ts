import request from '@/utils/request'
import type { loginparamsRules } from './types/user.d'
// 密码登录
export const loginByPassword = (loginparams: loginparamsRules) => {
  return request('/login/password', 'POST', loginparams)
}
