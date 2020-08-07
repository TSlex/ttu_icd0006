import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'flatpickr/dist/flatpickr.css';

import '@fortawesome/fontawesome-free/css/all.css'

import '@/static/site.css'
import '@/static/custom.css'

import moment from 'moment'

import { i18n } from "@/translations/i18n"

import { resolveTimeFormat, resolveDateFormat, formatShortTime } from './translations/formats'

// date and time formating for display
Vue.filter('formatDate', function (value: any) {
  if (typeof value !== "string") return value;
  if (value) {
    return moment(String(value) + "Z").format(resolveDateFormat())
  }
})

Vue.filter('formatTime', function (value: any) {
  if (typeof value !== "string") return value;
  if (value) {
    return moment(String(value) + "Z").format(resolveTimeFormat())
  }
})

Vue.filter('formatShortDate', function (value: any) {
  if (typeof value !== "string") return value;
  if (value) {
    return formatShortTime(value + "Z")
  }
})

Vue.filter('formatDateUTC', function (value: any) {
  if (typeof value !== "string") return value;
  if (value) {
    return moment(String(value)).format(resolveDateFormat())
  }
})

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

//logged and admin routes fallback
router.beforeEach((to, from, next) => {
  const loginOnly = to.matched.some(record => record.meta.loginOnly);
  const adminOnly = to.matched.some(record => record.meta.adminOnly);

  if (loginOnly && !store.getters.isAuthenticated) {
    next({ path: '/account/login' })
    return
  }

  if (adminOnly && !store.getters.isAdmin) {
    next({ path: '/404' })
    return
  }

  next()
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
