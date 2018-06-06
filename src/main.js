import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './util'

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

Vue.directive('permission', {
  inserted: function (el, binding) {
    /**
     * 权限控制过滤
     * 1: 权限存储至localStory 中，这个位置进行读取并操作
     */
    debugger
    console.log(Vue.$lodash)
    let origain = JSON.parse(localStorage.getItem('super-auth-key'))
    let isExist = false
    origain.forEach(element => {
      if (!isExist && element.code === binding.value.code) {
        isExist = true
      }
    })
    if (!isExist) {
      el.remove()
    }
  }
})
