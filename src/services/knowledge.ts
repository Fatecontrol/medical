import request from '@/utils/request'
import type { KnowledgeParams, KnowledgePage } from '@/types/consult'
// 获取文章列表
export const getKnowledgePage = (params: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
}
