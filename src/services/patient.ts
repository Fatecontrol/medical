import request from '@/utils/request'
import type { PatientList } from '@/types/user'
// 查询患者列表信息
export const getPatientList = () => {
  return request<PatientList>('/patient/mylist', 'GET')
}
