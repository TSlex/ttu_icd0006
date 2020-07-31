import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'flatpickr/dist/flatpickr.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '@fortawesome/fontawesome-free/css/all.css'

import '@/static/site.css'
import '@/static/custom.css'

import moment from 'moment'

import { i18n } from "@/translations/i18n"

// date and time formating for display
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

Vue.use(VueSweetalert2);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
