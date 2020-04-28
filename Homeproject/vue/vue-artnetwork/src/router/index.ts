import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

import AccountRegister from '../views/account/Register.vue'
import AccountLogin from '../views/account/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },

  { path: '/account/login', name: 'Login', component: AccountLogin },
  { path: '/account/register', name: 'Register', component: AccountRegister }
]

const router = new VueRouter({
  routes
})

export default router
