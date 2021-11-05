import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios    from 'axios'
import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective);
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/'

//TODO - Colocar esta parte somente se fizer a autenticação por JWT
// axios.interceptors.request.use(
//   (config) => {
//     const token = store.getters.getToken;
//     if (token) {
//       config.headers.Authorization = "Bearer " + token;
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status == 401) {
//       window.location = "#/home";
//     }
//     return Promise.reject(error);
//   }
// );


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
