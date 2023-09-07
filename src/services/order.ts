import request from '@/utils/request'
import type { OrderPre, AddressItem, OrderDetail, Logistics } from '@/types/order'
// 查询药品订单预支付信息
export const getMedicalOrderPre = (params: { prescriptionId: string }) => {
  return request<OrderPre>('/patient/medicine/order/pre', 'GET', params)
}
// 获取收货地址列表
export const getAddressList = () => request<AddressItem[]>('/patient/order/address')
// 创建药品订单
export const createMedicalOrder = (data: { id: string; addressId: string; couponId?: string }) => {
  return request<{ id: string }>('/patient/medicine/order', 'POST', data)
}
// 获取订单详情
export const getMedicalOrderDetail = (id: string) => {
  return request<OrderDetail>(`/patient/medicine/order/detail/${id}`)
}
// 获取物流详情
export const getMedicalOrderLogistics = (id: string) => {
  return request<Logistics>(`/patient/order/${id}/logistics`)
}
