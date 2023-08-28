import router from '@/router'
import { useUserStore } from './stores'

// 白名单列表
const whiteList = ['/login', '/register', '/404', '/401']
router.beforeEach((to) => {
  const store = useUserStore()
  // 如果没有token,并且进入页面不是白名单页面，直接进入登录页
  document.title = '医疗问诊 - ' + to.meta.title
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})
