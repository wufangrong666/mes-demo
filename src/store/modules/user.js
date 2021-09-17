import { login,logout } from '@/api/login'
import { adminIndexAuthList } from '@/api/common'
import { addAuth, removeAuth } from '@/utils/auth'
import Lockr from 'lockr'

const user = {
  state: {
    userInfo: null, 
    allAuth: null,
    operAuth: null,
    dsat: {}, 
    manage: {},
  },

  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ALLAUTH: (state, allAuth) => {
      state.allAuth = allAuth
    },
    SET_OPERAUTH: (state, operAuth) => {
      state.operAuth = operAuth
    },
    SET_DSAT: (state, dsat) => {
      state.dsat = dsat
    },
    SET_MANAGE: (state, manage) => {
      state.manage = manage
    }
  },

  actions: {
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(data => {
          Lockr.set('Admin-Token', data['Admin-Token'])
          Lockr.set('loginUserInfo', data.user)
          Lockr.set('authList', data.auth)
          Lockr.set('operauthList', data.operauth)
          addAuth(data['Admin-Token'],data.user.userId)
          commit('SET_USERINFO', data.user)
          commit('SET_ALLAUTH', data.auth)
          commit('SET_OPERAUTH', data.operauth)
          commit('SET_DSAT', data.auth.dsat)
          commit('SET_MANAGE', data.auth.manage)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取权限
    getAuth({
      commit
    }) {
      return new Promise((resolve, reject) => {
        adminIndexAuthList().then((response) => {
          const data = response.data
          Lockr.set('authList', data)
          let operAuth=Lockr.get('operauthList')
          commit('SET_ALLAUTH', data)
          commit('SET_OPERAUTH', operAuth)
          commit('SET_DSAT', data.dsat)
          commit('SET_MANAGE', data.manage)
          resolve(data)
        }).catch(error => {
          reject('')
        })
      })
    },
    // 登出
    LogOut({
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          /** flush 清空localStorage .rm('authKey') 按照key清除 */
          removeAuth()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
