import MemberIndex from '@/page/member/index.vue'
import MemberDetail from '@/page/member/detail.vue'

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
}]
