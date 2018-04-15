import ProductIndex from '@/page/product/index.vue'
import ProductDetail from '@/page/product/detail.vue'
import ProductSave from '@/page/product/save.vue'

export default [{
  path: '/product/v_index',
  name: 'ProductIndex',
  meta: {
    parentKey: 'Product',
    childrenKey: 'Index'
  },
  component: ProductIndex
},
{ path: '/product/v_detail',
  name: 'ProductDetail',
  meta: {
    parentKey: 'Product',
    childrenKey: 'Detail'
  },
  component: ProductDetail
},
{ path: '/product/v_save',
  name: 'ProductSave',
  meta: {
    parentKey: 'Product',
    childrenKey: 'Save'
  },
  component: ProductSave
}]
