import axios from 'axios'
import Highcharts from "highcharts"
import HighchartsVue from "highcharts-vue"
import hcMore from "highcharts/highcharts-more"
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

hcMore(Highcharts);
Vue.use(HighchartsVue);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
