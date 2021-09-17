import {
  asyncRouterMap
} from '@/router'

/**
 * 路由校验 
 * index=0crm  1khgl 2 ggkhc 3ggkhc下的菜单
 * @param {*} router 
 * @param {*} authInfo 
 */
function checkAuth(router, authInfo) {
  if (router.meta) {
    const metaInfo = router.meta
    if (!metaInfo.requiresAuth) {
      return true
    } else {
      if (metaInfo.index == 0) {
        return authInfo[metaInfo.type] ? true : false
      } else if (metaInfo.index == 1) {
        if (authInfo[metaInfo.type]) {
          return authInfo[metaInfo.type][metaInfo.subType] ? true : false
        }
        return false
      } else if (metaInfo.index == 2) {
        if (authInfo[metaInfo.onetype] && authInfo[metaInfo.onetype][metaInfo.twotype]) {
          return authInfo[metaInfo.onetype][metaInfo.twotype][metaInfo.subType] ? true : false
        }
      } else {
        if (authInfo[metaInfo.onetype] && authInfo[metaInfo.onetype][metaInfo.twotype] && authInfo[metaInfo.onetype][metaInfo.twotype][metaInfo.threetype]) {
          return authInfo[metaInfo.onetype][metaInfo.twotype][metaInfo.threetype][metaInfo.subType] ? true : false
        }
      }
    }
  }
  return true
}

/**
 * 过滤异步的路由
 * @param {*} routers 
 * @param {*} authInfo 
 */
const filterAsyncRouter = function (routers, authInfo) {
  const res = []
  routers.forEach(router => {
    const tmp = {
      ...router
    }
    if (checkAuth(tmp, authInfo)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, authInfo)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    addRouters: [],
    dsatRouters: {
      name: 'dsat',
      children: []
    },
    manageRouters: {
      name: 'manage',
      children: []
    },
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      for (let index = 0; index < routers.length; index++) {
        const element = routers[index]
        if (element.name == 'dsat') {
          state.dsatRouters = element
        }else if (element.name == 'manage') {
          state.manageRouters = element
        }
      }
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        let redirect = ''
        for (let index = 0; index < accessedRouters.length; index++) {
          const element = accessedRouters[index]
          if (element.children && element.children.length > 0) {
            element.redirect = element.path + '/' + element.children[0].path
          }
          if (element.redirect && !redirect) {
            redirect = element.redirect
          }
        }
        if (redirect) {
          accessedRouters.push({
            path: '/',
            redirect: redirect,
            hidden: true
          })
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
