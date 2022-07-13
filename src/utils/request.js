import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // 请求拦截器 统一携带请求头
  // 判断是否存在token
  if (store.state.token) {
    // 存在就在config上配置请求参数
    config.headers.Authorization = `${store.state.token}`
  }
  return config// 必须返回配置
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
