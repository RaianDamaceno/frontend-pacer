import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    token: ''
  },
  mutations: {
    setUserId(state, id: string) {
      state.userId = id;
    },
    setToken(state, token: string) {      
      state.token = token;
    },
  },
  actions: {
    async setUserId({commit}, payload) {
      commit('setUserId', payload);
    },
    async setToken({commit}, payload) {
      commit('setToken', payload);
    }
  },
  modules: {
  }
})
