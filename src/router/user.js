import User from '@/page/user/index.vue'

export default [{
  path: '/user/v_index',
  name: 'User',
  meta: {
    isShowBack: false,
    parentKey: 'User',
    childrenKey: 'Index'
  },
  component: User
}]
