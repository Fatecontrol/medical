import request from '@/utils/request'
import type {
  KnowledgeParams,
  KnowledgePage,
  DoctorPage,
  PageParams,
  FollowType
} from '@/types/consult'
// 获取文章列表
export const getKnowledgePage = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
}
// 获取推荐关注医生列表
export const getDoctorPage = (params: PageParams) => {
  return request<DoctorPage>('/home/page/doc', 'GET', params)
}
// 关注 取消关注
export const followDoctor = (id: string, type: FollowType = 'doc') => {
  return request('/like', 'POST', { id, type })
}
