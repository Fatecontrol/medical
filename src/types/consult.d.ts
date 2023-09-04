// 文章类型，关注医生的文章|推荐的文章|减脂|饮⻝
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'
// 文章信息类型
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}
// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}

// 文章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
// 通用的分⻚查询参数
export type PageParams = {
  // 当前⻚码
  current: number
  // 每⻚条数
  pageSize: number
}

// 医生卡片对象
export type Doctor = {
  id: string
  name: string
  avatar: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 是否关注 0 未关注 1 已关注
  likeFlag: 0 | 1
  // 接诊服务器
  serviceFee: number
  // 接诊人数
  consultationNum: number
  // 评分
  score: number
  // 主攻方向
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}

// 关注的类型，医生|文章|百科话题|疾病
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

// 引入枚举
import { ConsultType, IllnessTime } from './enums'
// 图片列表
export type Image = {
  // 图片ID
  id: string
  // 图片地址
  url: string
}
// 问诊记录
export type Consult = {
  // 问诊记录ID
  id: string
  // 问诊类型
  type: ConsultType
  // 快速问诊类型 0 普通 1 三甲
  illnessType: 0 | 1
  // 科室ID
  depId: string
  // 疾病描述
  illnessDesc: string
  // 疾病持续时间
  illnessTime: IllnessTime
  // 是否就诊过, 0未就诊 1就诊过
  consultFlag: 0 | 1
  // 图片数组
  pictures: Image[]
  // 患者ID
  patientId: string
  // 优惠券ID
  couponId: string
}
// 问诊记录-全都可选
export type PartialConsult = Partial<Consult>

export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 一级科室列表
export type SubDep = {
  // 科室ID
  id: string
  // 科室名称
  name: string
  // 头像
  avatar?: string
}
export type TopDep = SubDep & {
  // 二级科室数组
  child: SubDep[]
}

// 问诊订单预支付信息
export type ConsultOrderPreParams = pick<PartialConsult, 'type' | 'illnessType'>

// 问诊订单支付信息
export type ConsultOrderPreData = {
  // 积分抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 优惠券ID
  couponId: string
  // 需付款
  payment: number
  // 实付款
  actualPayment: number
}
// 问诊记录
// 请求参数
export type ConsultOrderListParams = PageParams & {
  // 问诊记录类型
  type: ConsultType
}
// 返回分页问诊订单类型
export type ConsultOrderPage = {
  // 总⻚数
  pageTotal: number
  // 总条数
  total: number
  // 列表数据
  rows: ConsultOrderItem[]
}
export type ConsultOrderItem = {
  /**
   * 开药门诊必有-过敏史0无1有2不清楚
   */
  allergicHistory?: number
  /**
   * 取消/退款进度
   */
  cancelProcess?: string
  /**
   * 取消订单原因
   */
  cancelReason?: string
  /**
   * 取消订单原因文字
   */
  cancelReasonValue?: string
  /**
   * 找医生/极速问诊必有-是否就诊过0未就诊1就诊过
   */
  consultFlag?: number
  /**
   * 倒计时-1表示计时已过(单位s)
   */
  countdown?: number
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 咨询的医生--找医生
   */
  docInfo?: DocInfo
  /**
   * 是否已经评价1 已评价0 未评价
   */
  evaluateFlag: string
  /**
   * 开药门诊必有-生育状态及计划0无1备孕中2已怀孕3哺乳期
   */
  fertilityStatus?: number
  /**
   * 订单id
   */
  id: string
  /**
   * 病情--症状描述
   */
  illnessDesc: string
  /**
   * 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上
   */
  illnessTime?: number
  /**
   * 开药门诊必有-肝功能0正常1异常2不清楚
   */
  liverFunction?: number
  /**
   * 订单编号
   */
  orderNo?: string
  /**
   * 价格
   */
  payment: number
  /**
   * 患者id,用于关联患者信息
   */
  patientInfo?: PatientInfo
  /**
   * 处方id信息
   */
  prescriptionId?: string
  /**
   * 就诊记录id信息
   */
  recordId: string
  /**
   * 开药门诊必有-肾功能0正常1异常2不清楚
   */
  renalFunction?: number
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  status: Status
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  statusValue?: string
  /**
   * 订单类型1问医生2极速问诊2开药问诊--默认是1
   */
  type?: number
}

/**
 * 咨询的医生--找医生
 */
export type DocInfo = {
  /**
   * 医生头像
   */
  avatar?: string
  /**
   * 接诊数量
   */
  consultationNum?: number
  /**
   * 科室
   */
  depName?: string
  /**
   * 医院等级
   */
  gradeName?: string
  /**
   * 医院名称
   */
  hospitalName?: string
  /**
   * 医生id
   */
  id?: string
  /**
   * 擅长
   */
  major?: string
  /**
   * 医生姓名
   */
  name?: string
  /**
   * 职称
   */
  positionalTitles?: string
  /**
   * 评分
   */
  score?: number
  /**
   * 服务费
   */
  serviceFee?: number
  /**
   * 医生状态0休息中1可以咨询
   */
  status?: number
}

/**
 * 患者id,用于关联患者信息
 */
export type PatientInfo = {
  /**
   * 患者年龄
   */
  age: string
  /**
   * 患者性别
   */
  gender: number
  /**
   * 患者id
   */
  id: string
  /**
   * 患者证件信息
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}
