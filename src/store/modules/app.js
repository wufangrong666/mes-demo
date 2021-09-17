import Lockr from 'lockr'
import { queryLogo } from "@/api/manage/logo"
/** 记录 侧边索引 */
const app = {
  state: {
    logo: '',
    name: '',
    lang: localStorage.lang || 'cn',
    sidebar: {
      activeIndex: '' // 目前激活的 行
    },
    navbar: {
      activeIndex: '' // 导航目前是第几个
    }
  },

  mutations: {
    SET_ACTIVEINDEX: (state, path) => {
      state.sidebar.activeIndex = path
    },
    SET_NAVACTIVEINDEX: (state, path) => {
      state.navbar.activeIndex = path
    },
    SET_APPLOGO: (state, logo) => {
      state.logo = logo
    },
    SET_APPNAME: (state, name) => {
      state.name = name
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
      window.app.$i18n.locale = lang
      localStorage.setItem('lang', lang)
      window.location.reload()
    }
  },

  actions: {
    // 查询系统logo
    SystemLogoAndName({
      commit
    }) {
      return new Promise((resolve, reject) => {
        queryLogo().then(res => {
          commit('SET_APPLOGO', res.data.img)
        })
      })
    },
  }
}

export default app
