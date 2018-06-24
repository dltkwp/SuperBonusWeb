import MinAdv from '@/page/adv/min-adv.vue'
import PcAdv from '@/page/adv/pc-adv.vue'

export default [{
  path: '/adv/v_min',
  name: 'MinAdv',
  meta: {
    isShowBack: false,
    parentKey: 'Adv',
    childrenKey: 'MinAdv',
    code: 'adv'
  },
  component: MinAdv
},
{
  path: '/adv/v_pc',
  name: 'PcAdv',
  meta: {
    isShowBack: false,
    parentKey: 'Adv',
    childrenKey: 'PcAdv',
    code: 'adv'
  },
  component: PcAdv
}]
