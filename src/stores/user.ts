import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
export const useUserStore = defineStore(
  'mt-user',
  () => {
    // 用户信息
    const user = ref<User>()
    // 设置用户 登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 清空用户
    const delUser = () => {
      user.value = undefined
    }
    return {
      user,
      setUser,
      delUser
    }
  },
  {
    persist: true
  }
)
