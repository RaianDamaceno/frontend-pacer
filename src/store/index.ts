import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    token: "",
    currentProject: "",
    currentSprint: "",
    currentTeam: "",
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
    setCurrentProject(state, project: string){
      state.currentProject = project;
    },
    setCurrentSprint(state, sprint: string){
      state.currentSprint = sprint;
    },
    setCurrentTeam(state, team: string){
      state.currentTeam = team;
    },
  },
  actions: {
    async setUserId({ commit }, payload) {
      commit("setUserId", payload);
    },
    async setToken({ commit }, payload) {
      commit("setToken", payload);
    },
    messageSuccess({ commit }, msg: string) {
      commit("setSnackbar", {
        text: msg,
        timeout: "2000",
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
    messageWarning({ commit }, msg) {
      commit("setSnackbar", {
        text: msg,
        timeout: "-1",
        color: 'orange lighten-1',
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
    getCurrentProject(state) {
      return state.currentProject;
    },
    getCurrentSprint(state) {
      return state.currentSprint;
    },
    getCurrentTeam(state) {
      return state.currentTeam;
    }
  },
  modules: {},
});
