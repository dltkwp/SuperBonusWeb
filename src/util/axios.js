import axios from 'axios'
export default {
  install: function (Vue) {
    axios.defaults.timeout = 5000 // 响应时间
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
    axios.defaults.baseURL = 'https://api.superbonus.cn/web/'

    axios.interceptors.request.use(
      config => {
        let token = localStorage.getItem('ksx-token-c')
        if (token) {
          config.headers.Authorization = token
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
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // 返回 401 清除token信息并跳转到登录页面
              localStorage.setItem('ksx-token-c', '')
              window.location.href = 'v_login'
          }
        }
        return Promise.reject(error.response.data)
      })

    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  }
}
