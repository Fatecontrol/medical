import router from '@/router'
import { useUserStore } from './stores'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false // 关闭圆圈圈
})
// 白名单列表
const whiteList = ['/login', '/register', '/404', '/401']
router.beforeEach((to) => {
  NProgress.start() // 开启进度条
  const store = useUserStore()
  // 如果没有token,并且进入页面不是白名单页面，直接进入登录页
  // document.title = '医疗问诊 - ' + to.meta.title
  document.title = '149优医问诊'
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})
// 关闭进度条
router.afterEach((to) => {
  // 修改标题
  document.title = `149优医问诊${'-' + to.meta.title || ''}`
  // 关闭进度条
  NProgress.done()
})
