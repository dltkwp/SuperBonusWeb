import TaskIndex from '@/page/task/index.vue'
import TaskDetail from '@/page/task/detail.vue'
import TaskSave from '@/page/task/save.vue'
import TaskEdit from '@/page/task/edit.vue'

export default [{
  path: '/task/v_index',
  name: 'Task',
  meta: {
    isShowBack: false,
    parentKey: 'Task',
    childrenKey: 'Index'
  },
  component: TaskIndex
}, {
  path: '/task/v_detail',
  name: 'Task',
  meta: {
    isShowBack: true,
    parentKey: 'Task',
    childrenKey: 'Detail'
  },
  component: TaskDetail
}, {
  path: '/task/v_save',
  name: 'Task',
  meta: {
    isShowBack: true,
    parentKey: 'Task',
    childrenKey: 'Save'
  },
  component: TaskSave
}, {
  path: '/task/v_edit',
  name: 'Task',
  meta: {
    isShowBack: true,
    parentKey: 'Task',
    childrenKey: 'Edit'
  },
  component: TaskEdit
}]
