import MemberIndex from '@/page/member/index.vue'
import MemberDetail from '@/page/member/detail.vue'
import MemberLevel from '@/page/member/level.vue'

export default [{
  path: '/member/v_index',
  name: 'MemberIndex',
  meta: {
    parentKey: 'Member',
    childrenKey: 'Index'
  },
  component: MemberIndex
},
{ path: '/member/v_detail',
  name: 'MemberDetail',
  meta: {
    parentKey: 'Member',
    childrenKey: 'Detail'
  },
  component: MemberDetail
},
{ path: '/member/v_level',
  name: 'MemberLevel',
  meta: {
    parentKey: 'SysCfg',
    childrenKey: 'Level'
  },
  component: MemberLevel
}]
