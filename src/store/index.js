import Vue from 'vue'
import Vuex from 'vuex'
import { rolesList } from '@/api/roles'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    getrolesList: []
  },
  getters: {
  },
  mutations: {
    // 保存token
    setToken (state, payload) {
      state.token = payload
    },
    // 删除token
    removeToken (state) {
      state.token = ''
    },
    getroles (state, payload) {
      state.getrolesList = payload
    }
  },
  actions: {
    async rolesList (context) {
      const res = await rolesList()
      // console.log(res)
      // this.grtrolesList = res.data.data
      // this.getroles(this.grtrolesList)
      context.commit('getroles', res.data.data)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
