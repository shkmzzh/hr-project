import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    if (!config.noToken) {
      // 为接口统一添加token,需要token的没有添加noToken属性
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.success) {
      return response.data
    } else {
      Message.error(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    console.dir(error)
    if (error.response && error.response.data.code) {
      // token失效  1：删除token，删除用户信息   2:错误提示   3：跳转到登录页
      store.commit('user/removeEvent')
      Message.error(error.response.data.message)
      router.push('/login')
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
