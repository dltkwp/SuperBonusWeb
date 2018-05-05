import PagesIndex from '@/page/pages/index.vue'
import PagesDetail from '@/page/pages/detail.vue'
import PagesSave from '@/page/pages/save.vue'

export default [{
  path: '/pages/v_index',
  name: 'PagesIndex',
  meta: {
    isShowBack: false,
    parentKey: 'Pages',
    childrenKey: 'Index'
  },
  component: PagesIndex
},
{ path: '/pages/v_detail',
  name: 'PagesDetail',
  meta: {
    isShowBack: true,
    parentKey: 'Pages',
    childrenKey: 'Detail'
  },
  component: PagesDetail
},
{ path: '/pages/v_save',
  name: 'PagesSave',
  meta: {
    isShowBack: true,
    parentKey: 'Pages',
    childrenKey: 'Save'
  },
  component: PagesSave
}]
