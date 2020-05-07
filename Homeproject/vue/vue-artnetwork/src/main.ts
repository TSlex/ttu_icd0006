import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'font-awesome/css/font-awesome.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import { * } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/free-regular-svg-icons'

import '@/static/site.css'

// library.add(faSearch)

Vue.config.productionTip = false
// Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
