import Recruitment from '@/page/recruitment/recruitment.vue'
import AddRecruitment from '@/page/recruitment/add-recruitment.vue'
import EditRecruitment from '@/page/recruitment/edit-recruitment.vue'

export default [{
  path: '/recruitment/v_recruitment',
  name: 'Recruitment',
  meta: {
    isShowBack: false,
    parentKey: 'Recruitment',
    childrenKey: 'Index',
    code: 'recruitment'
  },
  component: Recruitment
},
{
  path: '/recruitment/v_add',
  name: 'AddRecruitment',
  meta: {
    isShowBack: false,
    parentKey: 'Recruitment',
    childrenKey: 'Add',
    code: 'recruitment'
  },
  component: AddRecruitment
},
{
  path: '/recruitment/v_edit',
  name: 'EditRecruitment',
  meta: {
    isShowBack: false,
    parentKey: 'Recruitment',
    childrenKey: 'Edit',
    code: 'recruitment'
  },
  component: EditRecruitment
}]
