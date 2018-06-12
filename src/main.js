import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './util'

Vue.directive('permission', {
  inserted: function (el, binding) {
    /**
     * 权限控制过滤
     * 1: 权限存储至localStory 中，这个位置进行读取并操作
     */
    let origain = JSON.parse(localStorage.getItem('super-auth-key'))
    let isExist = false
    origain.forEach(element => {
      if (!isExist && binding.value.code.indexOf(element.code) >= 0) {
        isExist = true
      }
    })
    if (!isExist) {
      el.remove()
    }
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
