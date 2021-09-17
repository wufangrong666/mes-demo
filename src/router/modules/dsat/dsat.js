//1、基础数据配置
const jcsjpzAuth = {
  requiresAuth: true,
  index: 2,
  onetype: 'dsat',
  twotype: 'jcsjpz'
}
const jcsjpzRouter = {
  path: 'jcsjpz',
  redirect: 'jcsjpz/yqjlxpz',
  component: () => import('@/views/common/appview'),
  meta: {
    icon: 'customer',
    title: '基础数据配置',
    requiresAuth: true,
    index: 1,
    type: 'dsat',
    subType: 'jcsjpz'
  },
  hidden: false,
  children: [
    {
      path: 'yqjlxpz', 
      component: () => import('@/views/common/appview'),
      hidden: false,
      meta: {
        title: '元器件类型配置',
        subType: 'yqjlxpz',
        ...jcsjpzAuth
      }
    },
    {
      path: 'yqjppxhpz',
      component: () => import('@/views/common/appview'),
      hidden: false,
      meta: {
        title: '元器件品牌型号配置',
        subType: 'yqjppxhpz',
        ...jcsjpzAuth
      }
    },
    {
      path: 'jcmkpz', 
      component: () => import('@/views/common/appview'),
      hidden: false,
      meta: {
        title: '基础模块配置',
        subType: 'jcmkpz',
        ...jcsjpzAuth,
      }
    },
  ]
}

//2、项目配置
const xmpzAuth = {
  requiresAuth: true,
  index: 2,
  onetype: 'dsat',
  twotype: 'xmpz'
}
const xmpzRouter = {
  path: 'xmpz',
  component: () => import('@/views/common/appview'),
  meta: {
    icon: 'example',
    title: '项目配置',
    requiresAuth: true,
    index: 1,
    type: 'dsat',
    subType: 'xmpz'
  },
  hidden: false,
  children: [
    {
      path: 'xmmbpz', //项目模板配置
      component: () => import('@/views/common/appview'),
      meta: {
        subType: 'xmmbpz',
        title: '项目模板配置',
        ...xmpzAuth
      }
    },
    {
      path: 'tbxmpz',//投标项目配置
      component: () => import('@/views/common/appview'),
      meta: {
        subType: 'tbxmpz',
        title: '投标项目配置',
        ...xmpzAuth
      }
    },
  ]
}

// 3、报表与图形化
const bbytxhAuth = {
  requiresAuth: true,
  index: 2,
  onetype: 'dsat',
  twotype: 'bbytxh'
}
const bbytxhRouter = {
  path: 'bbytxh',
  component: () => import('@/views/common/appview'),
  meta: {
    index: 1,
    requiresAuth: true,
    type: 'dsat',
    subType: 'bbytxh',
    icon: 'versions',
    title: '报表与图形化'
  },
  hidden: false,
  children: [
    {
      path: 'sjbb', // 数据报表
      component: () => import('@/views/common/appview'),
      hidden: false,
      meta: {
        title: '数据报表',
        subType: 'sjbb',
        ...bbytxhAuth
      }
    },
    {
      path: 'bbtxh', // 报表图形化
      component: () => import('@/views/common/appview'),
      hidden: false,
      meta: {
        title: '报表图形化',
        subType: 'bbtxh',
        ...bbytxhAuth
      }
    },
  ]
}


export const children = [...jcsjpzRouter.children, ...xmpzRouter.children, ...bbytxhRouter.children]
export const childrenMenu = [jcsjpzRouter, xmpzRouter, bbytxhRouter]