import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: '注册' },
      component: () => import('../views/Register/index.vue')
    },
    {
      path: '/order',
      name: 'order',
      meta: { title: '订单' },
      component: () => import('@/views/Order/index.vue')
    },
    {
      path: '/user/patient',
      name: 'patient',
      meta: { title: '家庭档案' },
      component: () => import('@/views/User/PatientPage.vue')
    },
    {
      path: '/user/consult',
      name: 'consult',
      meta: { title: '问诊记录' },
      component: () => import('@/views/User/ConsultPage.vue')
    },
    {
      path: '/consult/fast',
      name: 'fast',
      meta: { title: '极速问诊' },
      component: () => import('@/views/Consult/ConsultFast.vue')
    },
    {
      path: '/consult/dep',
      name: 'dep',
      meta: { title: '选择科室' },
      component: () => import('@/views/Consult/ConsultDep.vue')
    },
    {
      path: '/consult/illness',
      name: 'illness',
      meta: { title: '病情描述' },
      component: () => import('@/views/Consult/ConsultIllness.vue')
    },
    {
      path: '/consult/pay',
      name: 'pay',
      meta: { title: '问诊支付' },
      component: () => import('@/views/Consult/ConsultPay.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          meta: { title: '首页' },
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'article',
          name: 'article',
          meta: { title: '健康百科' },
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: 'notify',
          name: 'notify',
          meta: { title: '消息中心' },
          component: () => import('@/views/Notify/index.vue')
        },
        {
          path: 'user',
          name: 'user',
          meta: { title: '我的' },
          component: () => import('@/views/User/index.vue')
        }
      ]
    }
  ]
})

export default router
