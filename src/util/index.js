import Vue from 'vue'

import LodashPlugin from './lodash.js'
import AxiosPlugin from './axios.js'
import MomentPlugin from './moment.js'

Vue.use(AxiosPlugin)
Vue.use(LodashPlugin)
Vue.use(MomentPlugin)
