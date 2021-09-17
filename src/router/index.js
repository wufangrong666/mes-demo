import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import dsatRouter from './modules/dsat/index'
import manageRouter from './modules/manage/index'

export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true,
  meta: {
    title: '登录系统',
  }
},{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true,
  meta: {
    title: '错误',
  }
},{
  path: '*',
  redirect: '/404',
  hidden: true,
  meta: {
    title: '错误',
  }
}]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  dsatRouter,
  manageRouter
]
