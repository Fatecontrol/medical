// 登录表单校验规则
const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机格式不正确' }
]
const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]
// 验证码规则
const codeRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\d{6}$/, message: '密码需8-24个字符' }
]
export { mobileRules, passwordRules, codeRules }
