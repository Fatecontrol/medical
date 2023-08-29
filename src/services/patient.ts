import request from '@/utils/request'
import type { PatientList, PatientType } from '@/types/user'
// 查询患者列表信息
export const getPatientList = () => {
  return request<PatientList>('/patient/mylist', 'GET')
}
// 添加患者
export const addPatient = (patient: PatientType) => {
  return request<PatientList>('/patient/add', 'POST', patient)
}
// 编辑患者
export const editPatient = (patient: PatientType) => {
  return request<PatientList>('/patient/update', 'PUT', patient)
}
// 删除患者
export const delPatient = (id: string) => {
  return request<PatientList>(`/patient/del/${id}`, 'DELETE')
}
