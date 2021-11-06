import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: ''
  },
  mutations: {
    setUserId(state, id: string) {
      state.userId = id;
    }
  },
  actions: {
    async setUserId({commit}, payload) {
      commit('setUserId', payload);
    }
  },
  modules: {
  }
})
