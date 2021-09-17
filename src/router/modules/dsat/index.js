import Layout from '@/views/layout/dsatLayout'
import {
  childrenMenu
} from './dsat'

const dsatRouter = {
  path: '/dsat',
  name: 'dsat',
  component: Layout,
  redirect: '/dsat/jcsjpz',
  meta: {
    title: 'DSAT',
    index: 0,
    type: 'dsat',
    icon: 'customer',
  },
  children: childrenMenu
}

export default dsatRouter
