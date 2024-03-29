import { ref } from 'vue'
import { followDoctor } from '@/services/knowledge'
import type { FollowType } from '@/types/consult'
// 封装逻辑，规范 useXXX表示使用某功能
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followDoctor(obj.id, type)
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
