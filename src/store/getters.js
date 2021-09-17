const getters = {
  userInfo: state => state.user.userInfo,
  lang: state => state.app.lang,
  logo: state => {
    if (state.app.logo) {
      return state.app.logo
    }
    return require('@/assets/img/logo.jpg')
  },
  name: state => {
    if (state.app.name) {
      return state.app.name
    }
    return 'AUTOBOX'
  },
  activeIndex: state => state.app.sidebar.activeIndex,
  navActiveIndex: state => state.app.navbar.activeIndex,
  //权限
  allAuth: state => state.user.allAuth,
  operAuth: state => state.user.operAuth,
  dsat: state => state.user.dsat,
  manage: state => state.user.manage,
  // 路由
  addRouters: state => state.permission.addRouters,
  dsatRouters: state => state.permission.dsatRouters,
  manageRouters: state => state.permission.manageRouters
}
/**
 * 使用说明
 * import { 
 *  } from 'vuex'
 * computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
 */

export default getters
