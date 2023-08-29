import cpNavBar from '@/components/cp-nav-bar.vue'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpRadioBtn: typeof cpNavBar
  }
}
