import Layout from '@/views/layout/manageLayout'
import {
  childrenMenu
} from './manage'

const manageRouter = {
  path: '/manage',
  component: Layout,
  //redirect: '/manage/compman',
  name: 'manage',
  meta: {
    icon: 'workbench',
    title: '系统设置',
    type: 'manage'
  },
  children: childrenMenu
}

export default manageRouter
