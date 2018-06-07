import ProductIndex from '@/page/product/index.vue'
import ProductDetail from '@/page/product/detail.vue'
import ProductSave from '@/page/product/save.vue'

export default [{
  path: '/product/v_index',
  name: 'ProductIndex',
  meta: {
    isShowBack: false,
    parentKey: 'Product',
    childrenKey: 'Index',
    code: 'product'
  },
  component: ProductIndex
},
{ path: '/product/v_detail',
  name: 'ProductDetail',
  meta: {
    isShowBack: true,
    parentKey: 'Product',
    childrenKey: 'Detail'
  },
  component: ProductDetail
},
{ path: '/product/v_save',
  name: 'ProductSave',
  meta: {
    isShowBack: true,
    parentKey: 'Product',
    childrenKey: 'Save'
  },
  component: ProductSave
}]
