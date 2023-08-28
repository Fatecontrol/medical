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
