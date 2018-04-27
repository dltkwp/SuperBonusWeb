import MemberIndex from '@/page/member/index.vue'
import MemberDetail from '@/page/member/detail.vue'
import MemberLevel from '@/page/member/level.vue'
import MemberEdit from '@/page/member/edit.vue'

export default [{
  path: '/member/v_index',
  name: 'MemberIndex',
  meta: {
    isShowBack: false,
    parentKey: 'Member',
    childrenKey: 'Index'
  },
  component: MemberIndex
},
{ path: '/member/v_detail',
  name: 'MemberDetail',
  meta: {
    isShowBack: true,
    parentKey: 'Member',
    childrenKey: 'Detail'
  },
  component: MemberDetail
},
{ path: '/member/v_edit',
  name: 'MemberEdit',
  meta: {
    isShowBack: true,
    parentKey: 'Member',
    childrenKey: 'Edit'
  },
  component: MemberEdit
},
{ path: '/member/v_level',
  name: 'MemberLevel',
  meta: {
    isShowBack: false,
    parentKey: 'SysCfg',
    childrenKey: 'Level'
  },
  component: MemberLevel
}]
