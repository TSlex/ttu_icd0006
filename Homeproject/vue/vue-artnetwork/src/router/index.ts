import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

import AccountRegister from '../views/account/Register.vue'
import AccountLogin from '../views/account/Login.vue'

import IdentityManage from '../views/identity/Manage.vue'

import ProfileIndex from '../views/profile/Index.vue'
import PostsCreate from '../views/posts/Create.vue'
import ChatRoom from '../views/messages/ChatRoom.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },

  // Account
  { path: '/account/login', name: 'Login', component: AccountLogin },
  { path: '/account/register', name: 'Register', component: AccountRegister },
  { path: '/account/manage/:startup?', name: 'Manage', component: IdentityManage, props: true },

  // Profile
  { path: '/profiles/:username', name: 'ProfileIndex', component: ProfileIndex, props: true },

  // Post
  { path: '/posts/create', name: 'PostsCreate', component: PostsCreate },

  // Message
  { path: '/messages', name: 'ChatRoomNoProps', component: ChatRoom, props: true },
  { path: '/messages/:chatRoomId', name: 'ChatRoom', component: ChatRoom, props: true },
]

const router = new VueRouter({
  routes
})

export default router
