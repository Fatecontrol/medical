import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, Method } from 'axios'
import type { Data } from '@/types/request'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'
const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 5000
})
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 通过请求头发送token
    const store = useUserStore()
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer ' + store.user.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== 10000) {
      showToast(res.data?.message || '响应失败')
      return Promise.reject(res.data)
    }

    return res.data
  },
  (error) => {
    // token 过期处理
    if (error.response.status === 401) {
      // 1.清空本地的用户信息和token pinia
      const store = useUserStore()
      store.delUser()
      // 2.回到登录页
      router.push(`/login${router.currentRoute.value.fullPath}`)
    }

    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  return instance<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
