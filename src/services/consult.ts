import request from '@/utils/request'
import type {
  TopDep,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialConsult,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderItem
} from '@/types/consult'
// 获取科室
export const getAllDep = () => request<TopDep[]>('/dep/all')
// 图片上传
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}
// 获取支付信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) => {
  return request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)
}
// 生成订单
export const createConsultOrder = (data: PartialConsult) => {
  return request<{ id: string }>('/patient/consult/order', 'POST', data)
}
// 生成支付地址的API函数
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => {
  return request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)
}
// 获取问诊记录
export const getConsultOrderList = (params: ConsultOrderListParams) => {
  return request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
}
// 取消订单
export const cancelOrder = (id: string | number) => {
  return request(`/patient/order/cancel/${id}`, 'PUT')
}
// 删除订单
export const deleteOrder = (id: string | number) => {
  return request(`/patient/order/${id}`, 'DELETE')
}
// 查看处方
export const getPrescriptionPic = (id: string | number) => {
  return request<{ id: string; url: string }>(`patient/consult/prescription/${id}`, 'GET')
}
// 查看订单详情
export const getOrderDetail = (orderId: string) => {
  return request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
}
