import axios from 'axios'
import superConst from './super-const'
export default {
  install: function (Vue) {
    axios.defaults.timeout = 5000 // 响应时间
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
    axios.defaults.baseURL = superConst.API_BASE_URL

    axios.interceptors.request.use(
      config => {
        let token = localStorage.getItem(superConst.SUPER_TOKEN_KEY)
        if (token) {
          config.headers.token = JSON.parse(token).token
        }
        return config
      },
      err => {
        return Promise.reject(err)
      })

    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              // 返回 401 清除token信息并跳转到登录页面
              localStorage.setItem(superConst.SUPER_TOKEN_KEY, '')
              window.location.href = '/v_login'
          }
          return Promise.reject(error.response.data)
        } else {
          // if (error.message === 'Network Error') {
          //   localStorage.setItem(superConst.SUPER_TOKEN_KEY, '')
          //   window.location.href = '/v_login'
          // }
          return Promise.reject(error)
        }
      })

    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  }
}
