import Vue from 'vue'
import Router from 'vue-router'

import IndexRouter from '@/page/index/index.vue'
import AdvRouter from './adv'
import LoginRouter from './login'
import MemberRouter from './member'
import OrderRouter from './order'
import ProductRouter from './product'
import ForgetPwdRouter from './forgetPwd'
import Login from '@/page/login/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Login',
    meta: {
      parentKey: 'Login',
      childrenKey: 'Index'
    },
    component: Login
  },
  {
    path: '/v_index',
    name: 'Index',
    meta: {
      parentKey: 'Index',
      childrenKey: 'Index'
    },
    component: IndexRouter
  }].concat(AdvRouter).concat(LoginRouter).concat(MemberRouter).concat(OrderRouter).concat(ProductRouter).concat(ForgetPwdRouter)
})
