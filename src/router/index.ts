import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/room',
      name: 'room',
      meta: { title: '医生问诊室' },
      component: () => import('@/views/Room/index.vue')
    },
    {
      path: '/order/pay',
      name: 'orderpay',
      meta: { title: '药品支付' },
      component: () => import('@/views/Order/OrderPay.vue')
    },
    {
      path: '/user/consult/:id',
      name: 'detail',
      meta: { title: '问诊详情' },
      component: () => import('@/views/User/ConsultDeatil.vue')
    },
    {
      path: '/order/pay/result',
      name: 'orderpayresult',
      meta: { title: '药品支付结果' },
      component: () => import('@/views/Order/OrderPayResult.vue')
    },
    {
      path: '/order/:id',
      name: 'orderdetail',
      meta: { title: '药品订单详情' },
      component: () => import('@/views/Order/OrderDetail.vue')
    },
    {
      path: '/order/logistics/:id',
      name: 'orderLogistics',
      component: () => import('@/views/Order/OrderLogistics.vue'),
      meta: { title: '物流详情' }
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
