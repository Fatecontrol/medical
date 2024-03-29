// 药品信息
export type Medicine = {
  /**
   * 药品价格
   */
  amount: string
  /**
   * 药品图片
   */
  avatar: string
  /**
   * 主键id
   */
  id: string
  /**
   * 药品名称
   */
  name: string
  /**
   * 是否是处方药0不是1是
   */
  prescriptionFlag: number
  /**
   * 选择的药品数量
   */
  quantity: number
  /**
   * 药品规格
   */
  specs: string
  /**
   * 药品用法用量
   */
  usageDosag: string
}
export type OrderPre = {
  // 处方ID
  id: string
  // 优惠券ID
  couponId: string
  // 积分抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 应付款
  payment: number
  // 邮费
  expressFee: number
  // 实付款
  actualPayment: number
  // 药品订单
  medicines: Medicine[]
}
export type Address = {
  // 地址ID
  id: string
  // 联系方式
  mobile: string
  // 收件人
  receiver: string
  // 省
  province: string
  // 市
  city: string
  // 区
  county: string
  // 详细地址
  addressDetail: string
}
// 订单列表
export type AddressItem = Address & {
  // 是否默认地址，0 不是 1 是
  isDefault: 0 | 1
  // 邮政编码
  postalCode: string
}
// 下单的参数类型
export type MedicineOrderType = {
  /**
   * 地址信息
   */
  addressId: string
  /**
   * 使用优惠券信息，不使用优惠券，不用传值
   */
  couponId?: string
  /**
   * 处方id
   */
  id: string
}
// 药品订单详情返回的数据类型

export type OrderDetail = {
  /**
   * 实际付款金额
   */
  actualPayment: number
  /**
   * 地址信息
   */
  addressInfo: AddressInfo
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
   * 待支付返回的倒计时-1表示已经结束，单位s
   */
  countdown?: number
  /**
   * 优惠券抵扣金额
   */
  couponDeduction: number
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 运费
   */
  expressFee: number
  /**
   * 物流信息信息--最新的物流信息
   */
  expressInfo?: ExpressInfo
  /**
   * 订单id
   */
  id: string
  /**
   * 处方的药品列表信息
   */
  medicines?: Medicine[]
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 应付款（药品总金额）
   */
  payment: string
  /**
   * 支付方式0微信支付，1支付宝
   */
  paymentMethod: number
  /**
   * 支付时间
   */
  payTime: string
  /**
   * 处方id信息
   */
  prescriptionId?: string
  /**
   * 药品订单对应处方的聊天室id
   */
  roomId: string
  /**
   * 药品订单状态10待支付11待发货12待收货13已完成14已取消
   */
  status: number
  /**
   * 药品订单状态10待支付11待发货12待收货13已完成14已取消
   */
  statusValue: string
  /**
   * 订单类型1问医生2极速问诊3开药问诊4、药品订单
   */
  type?: number
}
export type AddressInfo = {
  /**
   * 具体地址
   */
  addressDetail: string
  /**
   * 市区信息
   */
  city: string
  /**
   * 区县信息
   */
  county: string
  /**
   * 地址id
   */
  id: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 省份
   */
  province: string
  /**
   * 收件人
   */
  receiver: string
}
/**
 * 物流信息信息--最新的物流信息
 */
export type ExpressInfo = {
  /**
   * 物流信息内容
   */
  content: string
  /**
   * 物流信息内容
   */
  time: string
}
// 物流
export type Express = {
  // 物流信息ID
  id: string
  // 物流内容
  content: string
  // 创建时间
  createTime: string
  // 物流状态
  status: ExpressStatus
  // 状态文章
  statusValue: string
}
export type Location = {
  // 经度
  longitude: string
  // 纬度
  latitude: string
}
export enum ExpressStatus {
  // 已发货
  Delivered = 1,
  // 已揽件
  Received = 2,
  // 运输中
  Transit = 3,
  // 派送中
  Delivery = 4,
  // 已签收
  Signed = 5
}
export type Logistics = {
  // 预计送达时间
  estimatedTime: string
  // 物流公司名称
  name: string
  // 物流编号
  awbNo: string
  // 最新物流状态
  status: ExpressStatus
  // 最新物流状态文字
  statusValue: string
  // 物流信息数组
  list: Express[]
  // 轨迹信息数组
  logisticsInfo: Location[]
  // 当前运输位置
  currentLocationInfo: Location
}
