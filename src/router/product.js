import OrderIndex from '@/page/order/index.vue'
import OrderDetail from '@/page/order/detail.vue'
import OrderSave from '@/page/order/save.vue'

export default [{
  path: '/order/v_index',
  name: 'OrderIndex',
  meta: {
    parentKey: 'Order',
    childrenKey: 'Index'
  },
  component: OrderIndex
},
{ path: '/order/v_detail',
  name: 'OrderDetail',
  meta: {
    parentKey: 'Order',
    childrenKey: 'Detail'
  },
  component: OrderDetail
},
{ path: '/order/v_save',
  name: 'OrderSave',
  meta: {
    parentKey: 'Order',
    childrenKey: 'Save'
  },
  component: OrderSave
}]
