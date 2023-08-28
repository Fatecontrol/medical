export interface loginparamsRules {
  mobile: string
  password: string
  code: string
}

/* export interface codeParams {
  mobile: string
  type: codeType
} */
export type codeTypeRules = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
