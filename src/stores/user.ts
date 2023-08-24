import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('mt-user', () => {
  const user = ref()
  const setUser = (u: any) => {
    user.value = u
  }
  return {
    user,
    setUser
  }
})
