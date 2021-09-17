import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
  },
  getters,
  state: {
    showFlag: false,
    xbjFlag :false
  },
  mutations: {
    edit(state) {
      state.showFlag = true
    },
    set(state){
      state.showFlag = false
    },
  }
})

export default store
