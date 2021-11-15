import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    token: "",
    snackbar: {},
  },
  mutations: {
    setUserId(state, id: string) {
      state.userId = id;
      localStorage.setItem("userId", id);
    },
    setToken(state, token: string) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setSnackbar(state, snackbar) {
      state.snackbar = snackbar;
    },
  },
  actions: {
    async setUserId({ commit }, payload) {
      commit("setUserId", payload);
    },
    async setToken({ commit }, payload) {
      commit("setToken", payload);
    },
    messageSuccess({ commit }, msg) {
      commit("setSnackbar", {
        text: msg,
        timeout: "6000",
        color: 'success',
        show: true,
      });
    },
    messageError({ commit }, msg) {
      commit("setSnackbar", {
        text: msg,
        timeout: "4000",
        color: 'error',
        show: true,
      });
    },
    messageAlert({ commit }, msg) {
      commit("setSnackbar", {
        text: msg,
        timeout: "-1",
        color: 'blue',
        show: true,
      });
    },
  },
  getters: {
    getUserId(state) {
      return !state.userId ? localStorage.getItem("userId") : state.userId;
    },
    getToken(state) {
      return !state.token ? localStorage.getItem("token") : state.token;
    },
  },
  modules: {},
});
