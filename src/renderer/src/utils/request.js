import axios from 'axios'
import CONFIG from '@config/index'

import { showLoading, hideLoading } from '@utils/loading'

axios.defaults.baseURL = CONFIG.baseURL
axios.defaults.timeout = 5000
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log(config, 'config')
    if (config.loading) {
      showLoading()
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status) {
      // loading.close()
      hideLoading()
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

//对GET POST进行二次封装
const http = {
  get: (url, params = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: 'GET',
        params: params,
        ...config
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post: (url, data = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: 'POST',
        data: data,
        ...config
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default http
