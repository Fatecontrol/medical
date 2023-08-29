export type User =
  | {
      /* token令牌 */
      token: string
      /* ⽤户ID */
      id: string
      /* ⽤户名称 */
      account: string
      /* ⼿机号 */
      mobile: string
      /* 头像 */
      avatar: string
    }
  | undefined
export type Code = {
  code: string
}
// 匹配出非token字段的类型
type OmitUser = Omit<User, 'token'>

type Info = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// 交叉类型
export type UserInfo = Info & UserInfo

// 家庭档案列表类型
type PatientType = {
  name: string // 姓名
  idCard: string // 身份证
  defaultFlag: string // 是否设置为默认患者 0 不是 1 是
  gender?: number // 性别 1 男 0 女 可选
  genderValue: number // 性别值
  age?: number // 年龄 可选
  id: string
}
export type PatientList = PatientType[]
