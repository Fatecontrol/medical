import cpNavBar from '@/components/cp-nav-bar.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
  }
}
