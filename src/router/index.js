import Vue from 'vue'
import Router from 'vue-router'

import AdvRouter from './adv'
import LoginRouter from './login'
import MemberRouter from './member'
import OrderRouter from './order'
import ProductRouter from './product'
import Login from '@/page/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    meta: {
      parentKey: 'Login',
      childrenKey: 'Index'
    },
    component: Login
  }].concat(AdvRouter).concat(LoginRouter).concat(MemberRouter).concat(OrderRouter).concat(ProductRouter)
})
