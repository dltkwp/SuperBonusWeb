import Employee from '@/page/employee/index.vue'
import EmployeeConfig from '@/page/employee/config.vue'

export default [{
  path: '/employee/v_index',
  name: 'Employee',
  meta: {
    isShowBack: false,
    parentKey: 'Employee',
    childrenKey: 'Index',
    code: 'employee'
  },
  component: Employee
},
{
  path: '/employee/v_config',
  name: 'EmployeeConfig',
  meta: {
    isShowBack: false,
    parentKey: 'SysCfg',
    childrenKey: 'Employee',
    code: 'setting_employee'
  },
  component: EmployeeConfig
}]
