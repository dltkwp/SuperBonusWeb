import lodash from 'lodash'
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
  }
}
