import Order from '@/page/order/index.vue'

export default [{
  path: '/order/v_index',
  name: 'Order',
  meta: {
    isShowBack: false,
    parentKey: 'Order',
    childrenKey: 'Index'
  },
  component: Order
}]
