import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import '@fortawesome/fontawesome-free/css/all.css'

import '@/static/site.css'
import '@/static/custom.css'

import moment from 'moment'

Vue.filter('formatDate', function (value: any) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

Vue.filter('formatTime', function (value: any) {
  if (value) {
    return moment(String(value)).format('hh:mm')
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
