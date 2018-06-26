import Meet from '@/page/meet/meet.vue'
import AddMeet from '@/page/meet/add-meet.vue'
import EditMeet from '@/page/meet/edit-meet.vue'

export default [{
  path: '/meet/v_meet',
  name: 'Meet',
  meta: {
    isShowBack: false,
    parentKey: 'Meet',
    childrenKey: 'Index',
    code: 'meeting'
  },
  component: Meet
},
{
  path: '/meet/v_add',
  name: 'AddMeet',
  meta: {
    isShowBack: false,
    parentKey: 'Meet',
    childrenKey: 'Add',
    code: 'meeting'
  },
  component: AddMeet
},
{
  path: '/meet/v_edit',
  name: 'EditMeet',
  meta: {
    isShowBack: false,
    parentKey: 'Meet',
    childrenKey: 'Edit',
    code: 'meeting'
  },
  component: EditMeet
}]
