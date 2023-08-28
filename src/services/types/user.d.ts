export interface loginparamsRules {
  mobile: string
  password: string
  code?: string
}

export interface codeParams {
  mobile: string
  code: string
}
