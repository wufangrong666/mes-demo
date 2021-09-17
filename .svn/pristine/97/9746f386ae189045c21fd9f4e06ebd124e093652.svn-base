import axios from 'axios'
import cache from './cache'
import Lockr from 'lockr'
import store from '@/store'

/** 移除授权信息 */
export function removeAuth() {
  return new Promise((resolve, reject) => {
    // 异步操作 并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数
    cache.rmAxiosCache()
    store.commit('SET_ALLAUTH', null)
    delete axios.defaults.headers['Admin-Token']
    // 删除头部默认token
    resolve(true)
  })
}

/** 注入授权信息 */
export function addAuth(adminToken, userId) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['Admin-Token'] = adminToken
    axios.defaults.headers['visa'] = userId
    resolve(true)
  })
}

/** 获取授权信息 */
export function getAuth() {
  /** 全局路由触发这个方法  如果有缓存暂时在这里交与 */
  if (Lockr.get('Admin-Token') && !axios.defaults.headers['Admin-Token']) {
    axios.defaults.headers['visa'] = Lockr.get('loginUserInfo').userId
    cache.updateAxiosCache()
  }
  if (axios.defaults.headers['Admin-Token']) {
    return true
  }
  return false
}
