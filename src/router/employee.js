import Employee from '@/page/employee/index.vue'

export default [{
  path: '/employee/v_index',
  name: 'Employee',
  meta: {
    isShowBack: false,
    parentKey: 'Employee',
    childrenKey: 'Index'
  },
  component: Employee
}]
