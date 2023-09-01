import request from '@/utils/request'
import type {
  KnowledgeParams,
  KnowledgePage,
  DoctorPage,
  PageParams,
  FollowType,
  TopDep,
  Image
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
// 获取科室
export const getAllDep = () => request<TopDep[]>('/dep/all')
// 图片上传
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}
