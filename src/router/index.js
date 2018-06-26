import Vue from 'vue'
import Router from 'vue-router'

import IndexRouter from '@/page/index/index.vue'
import AdvRouter from './adv'
import LoginRouter from './login'
import MemberRouter from './member'
import OrderRouter from './order'
import ProductRouter from './product'
import ForgetPwdRouter from './forgetPwd'
import Task from './task'
import User from './user'
import Pages from './pages'
import Employee from './employee'
import Meet from './meet'

import Login from '@/page/login/index.vue'
import Notfound from '@/page/common/404.vue'
import NoAuth from '@/page/common/NoAuth.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'LoginEx',
    meta: {
      isShowBack: false,
      parentKey: 'Login',
      childrenKey: 'Index'
    },
    component: Login
  },
  {
    path: '/404',
    name: '404',
    meta: {
      isShowBack: false,
      parentKey: '404',
      childrenKey: '404'
    },
    component: Notfound
  },
  {
    path: '/no_auth',
    name: 'NoAuth',
    meta: {
      isShowBack: false,
      parentKey: 'NoAuth',
      childrenKey: 'NoAuth'
    },
    component: NoAuth
  },
  {
    path: '/v_index',
    name: 'Index',
    meta: {
      isShowBack: false,
      parentKey: 'Index',
      childrenKey: 'Index'
    },
    component: IndexRouter
  }].concat(AdvRouter).concat(LoginRouter).concat(MemberRouter)
    .concat(OrderRouter).concat(ProductRouter).concat(ForgetPwdRouter)
    .concat(Task).concat(User).concat(Pages).concat(Employee)
    .concat(Meet)
})

router.beforeEach((to, from, next) => {
  /**
   * 权限控制处理
   */
  if (to.meta && to.meta.code) {
    let origain = JSON.parse(localStorage.getItem('super-auth-key'))
    let isExist = false
    origain.forEach(element => {
      if (!isExist && element.code === to.meta.code) {
        isExist = true
      }
    })
    if (!isExist) {
      next('/no_auth')
    } else {
      next()
    }
  } else {
    if (!to.matched.length) {
      next('/404')
    } else {
      next()
    }
  }
})

export default router
