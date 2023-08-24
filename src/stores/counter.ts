import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment(n: number) {
      count.value += n
    }
    const jian = () => {
      count.value--
    }
    return { count, doubleCount, increment, jian }
  },
  {
    persist: true
  }
)
