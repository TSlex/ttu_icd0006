import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

import AccountRegister from '@/views/account/Register.vue'
import AccountLogin from '@/views/account/Login.vue'

import IdentityManage from '@/views/identity/Manage.vue'

import ProfileIndex from '@/views/profile/Index.vue'
import PostsCreate from '@/views/posts/Create.vue'
import ChatRoom from '@/views/messages/ChatRoom.vue'

// ======================= admin =======================
import AdminPanel from '@/views/admin/views/AdminPanel.vue'

import BPIndexA from '@/views/admin/views/BlockedProfiles/Index.vue'
import BPDetailsA from '@/views/admin/views/BlockedProfiles/Details.vue'
import BPEditA from '@/views/admin/views/BlockedProfiles/Edit.vue'

import CMIndexA from '@/views/admin/views/ChatMembers/Index.vue'
import CMDetailsA from '@/views/admin/views/ChatMembers/Details.vue'
import CMEditA from '@/views/admin/views/ChatMembers/Edit.vue'

import ChatRolesIndexA from '@/views/admin/views/ChatRoles/Index.vue'
import ChatRolesDetailsA from '@/views/admin/views/ChatRoles/Details.vue'
import ChatRolesEditA from '@/views/admin/views/ChatRoles/Edit.vue'

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


  // ======================= admin =======================
  { path: '/admin', name: 'AdminPanel', component: AdminPanel },

  { path: '/admin/blockedprofiles', name: 'BPIndexA', component: BPIndexA },
  { path: '/admin/blockedprofiles/details/:id', name: 'BPDetailsA', component: BPDetailsA, props: true },
  { path: '/admin/blockedprofiles/edit/:id', name: 'BPEditA', component: BPEditA, props: true },

  { path: '/admin/chatmembers', name: 'CMIndexA', component: CMIndexA },
  { path: '/admin/chatmembers/details/:id', name: 'CMDetailsA', component: CMDetailsA, props: true },
  { path: '/admin/chatmembers/edit/:id', name: 'CMEditA', component: CMEditA, props: true },

  { path: '/admin/chatroles', name: 'ChatRolesIndexA', component: ChatRolesIndexA },
  { path: '/admin/chatroles/details/:id', name: 'ChatRolesDetailsA', component: ChatRolesDetailsA, props: true },
  { path: '/admin/chatroles/edit/:id', name: 'ChatRolesEditA', component: ChatRolesEditA, props: true },
]

const router = new VueRouter({
  routes
})

export default router
