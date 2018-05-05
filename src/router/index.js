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

import Login from '@/page/login/index.vue'
import Notfound from '@/page/notfound/index.vue'

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
    .concat(Task).concat(User).concat(Pages)
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/404')
  } else {
    next()
  }
})

export default router
