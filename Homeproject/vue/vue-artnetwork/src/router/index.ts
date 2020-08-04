import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/404.vue'

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
import ChatRolesCreateA from '@/views/admin/views/ChatRoles/Create.vue'

import ChatRoomsIndexA from '@/views/admin/views/ChatRooms/Index.vue'
import ChatRoomsDetailsA from '@/views/admin/views/ChatRooms/Details.vue'
import ChatRoomsEditA from '@/views/admin/views/ChatRooms/Edit.vue'
import ChatRoomsCreateA from '@/views/admin/views/ChatRooms/Create.vue'

import CommentsIndexA from '@/views/admin/views/Comments/Index.vue'
import CommentsDetailsA from '@/views/admin/views/Comments/Details.vue'
import CommentsEditA from '@/views/admin/views/Comments/Edit.vue'
import CommentsCreateA from '@/views/admin/views/Comments/Create.vue'

import FavoritesIndexA from '@/views/admin/views/Favorites/Index.vue'
import FavoritesDetailsA from '@/views/admin/views/Favorites/Details.vue'
import FavoritesEditA from '@/views/admin/views/Favorites/Edit.vue'

import FollowersIndexA from '@/views/admin/views/Followers/Index.vue'
import FollowersDetailsA from '@/views/admin/views/Followers/Details.vue'
import FollowersEditA from '@/views/admin/views/Followers/Edit.vue'

import ImagesIndexA from '@/views/admin/views/Images/Index.vue'
import ImagesDetailsA from '@/views/admin/views/Images/Details.vue'
import ImagesEditA from '@/views/admin/views/Images/Edit.vue'
import ImagesCreateA from '@/views/admin/views/Images/Create.vue'

import MessagesIndexA from '@/views/admin/views/Messages/Index.vue'
import MessagesDetailsA from '@/views/admin/views/Messages/Details.vue'
import MessagesEditA from '@/views/admin/views/Messages/Edit.vue'
import MessagesCreateA from '@/views/admin/views/Messages/Create.vue'

import GiftsIndexA from '@/views/admin/views/Gifts/Index.vue'
import GiftsDetailsA from '@/views/admin/views/Gifts/Details.vue'
import GiftsEditA from '@/views/admin/views/Gifts/Edit.vue'
import GiftsCreateA from '@/views/admin/views/Gifts/Create.vue'

import PostsIndexA from '@/views/admin/views/Posts/Index.vue'
import PostsDetailsA from '@/views/admin/views/Posts/Details.vue'
import PostsEditA from '@/views/admin/views/Posts/Edit.vue'
import PostsCreateA from '@/views/admin/views/Posts/Create.vue'

import ProfileGiftsIndexA from '@/views/admin/views/ProfileGifts/Index.vue'
import ProfileGiftsDetailsA from '@/views/admin/views/ProfileGifts/Details.vue'
import ProfileGiftsEditA from '@/views/admin/views/ProfileGifts/Edit.vue'
import ProfileGiftsCreateA from '@/views/admin/views/ProfileGifts/Create.vue'

import ProfileRanksIndexA from '@/views/admin/views/ProfileRanks/Index.vue'
import ProfileRanksDetailsA from '@/views/admin/views/ProfileRanks/Details.vue'
import ProfileRanksEditA from '@/views/admin/views/ProfileRanks/Edit.vue'
import ProfileRanksCreateA from '@/views/admin/views/ProfileRanks/Create.vue'

import ProfilesIndexA from '@/views/admin/views/Profiles/Index.vue'
import ProfilesDetailsA from '@/views/admin/views/Profiles/Details.vue'
import ProfilesEditA from '@/views/admin/views/Profiles/Edit.vue'
import ProfilesCreateA from '@/views/admin/views/Profiles/Create.vue'

import RanksIndexA from '@/views/admin/views/Ranks/Index.vue'
import RanksDetailsA from '@/views/admin/views/Ranks/Details.vue'
import RanksEditA from '@/views/admin/views/Ranks/Edit.vue'
import RanksCreateA from '@/views/admin/views/Ranks/Create.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  // { path: '/404', name: '404', component: NotFound },

  // Account
  { path: '/account/login', name: 'Login', component: AccountLogin },
  { path: '/account/register', name: 'Register', component: AccountRegister },
  { path: '/account/manage/:startup?', name: 'Manage', component: IdentityManage, props: true, meta: { loginOnly: true, adminOnly: false } },

  // Profile
  { path: '/profiles/:username', name: 'ProfileIndex', component: ProfileIndex, props: true },

  // Post
  { path: '/posts/create', name: 'PostsCreate', component: PostsCreate, meta: { loginOnly: true, adminOnly: false } },

  // Message
  { path: '/messages', name: 'ChatRoomNoProps', component: ChatRoom, props: true, meta: { loginOnly: true, adminOnly: false } },
  { path: '/messages/:chatRoomId', name: 'ChatRoom', component: ChatRoom, props: true, meta: { loginOnly: true, adminOnly: false } },


  // ======================= admin =======================
  { path: '/admin/panel', name: 'AdminPanel', component: AdminPanel },

  { path: '/admin/blockedprofiles', name: 'BlockedProfilesIndexA', component: BPIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/blockedprofiles/details/:id', name: 'BlockedProfilesDetailsA', component: BPDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/blockedprofiles/edit/:id', name: 'BlockedProfilesEditA', component: BPEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/chatmembers', name: 'ChatMembersIndexA', component: CMIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatmembers/details/:id', name: 'ChatMembersDetailsA', component: CMDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatmembers/edit/:id', name: 'ChatMembersEditA', component: CMEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/chatroles', name: 'ChatRolesIndexA', component: ChatRolesIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatroles/create', name: 'ChatRolesCreateA', component: ChatRolesCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatroles/details/:id', name: 'ChatRolesDetailsA', component: ChatRolesDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatroles/edit/:id', name: 'ChatRolesEditA', component: ChatRolesEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/chatrooms', name: 'ChatRoomsIndexA', component: ChatRoomsIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatrooms/create', name: 'ChatRoomsCreateA', component: ChatRoomsCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatrooms/details/:id', name: 'ChatRoomsDetailsA', component: ChatRoomsDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/chatrooms/edit/:id', name: 'ChatRoomsEditA', component: ChatRoomsEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/comments', name: 'CommentsIndexA', component: CommentsIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/comments/create', name: 'CommentsCreateA', component: CommentsCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/comments/details/:id', name: 'CommentsDetailsA', component: CommentsDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/comments/edit/:id', name: 'CommentsEditA', component: CommentsEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/favorites', name: 'FavoritesIndexA', component: FavoritesIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/favorites/details/:id', name: 'FavoritesDetailsA', component: FavoritesDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/favorites/edit/:id', name: 'FavoritesEditA', component: FavoritesEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/followers', name: 'FollowersIndexA', component: FollowersIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/followers/details/:id', name: 'FollowersDetailsA', component: FollowersDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/followers/edit/:id', name: 'FollowersEditA', component: FollowersEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/images', name: 'ImagesIndexA', component: ImagesIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/images/create', name: 'ImagesCreateA', component: ImagesCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/images/details/:id', name: 'ImagesDetailsA', component: ImagesDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/images/edit/:id', name: 'ImagesEditA', component: ImagesEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/messages', name: 'MessagesIndexA', component: MessagesIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/messages/create', name: 'MessagesCreateA', component: MessagesCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/messages/details/:id', name: 'MessagesDetailsA', component: MessagesDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/messages/edit/:id', name: 'MessagesEditA', component: MessagesEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/gifts', name: 'GiftsIndexA', component: GiftsIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/gifts/create', name: 'GiftsCreateA', component: GiftsCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/gifts/details/:id', name: 'GiftsDetailsA', component: GiftsDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/gifts/edit/:id', name: 'GiftsEditA', component: GiftsEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/posts', name: 'PostsIndexA', component: PostsIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/posts/create', name: 'PostsCreateA', component: PostsCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/posts/details/:id', name: 'PostsDetailsA', component: PostsDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/posts/edit/:id', name: 'PostsEditA', component: PostsEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/profilegifts', name: 'ProfileGiftsIndexA', component: ProfileGiftsIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profilegifts/create', name: 'ProfileGiftsCreateA', component: ProfileGiftsCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profilegifts/details/:id', name: 'ProfileGiftsDetailsA', component: ProfileGiftsDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profilegifts/edit/:id', name: 'ProfileGiftsEditA', component: ProfileGiftsEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/profileranks', name: 'ProfileRanksIndexA', component: ProfileRanksIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profileranks/create', name: 'ProfileRanksCreateA', component: ProfileRanksCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profileranks/details/:id', name: 'ProfileRanksDetailsA', component: ProfileRanksDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profileranks/edit/:id', name: 'ProfileRanksEditA', component: ProfileRanksEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/profiles', name: 'ProfilesIndexA', component: ProfilesIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profiles/details/:id', name: 'ProfilesDetailsA', component: ProfilesDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/profiles/edit/:id', name: 'ProfilesEditA', component: ProfilesEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  { path: '/admin/ranks', name: 'RanksIndexA', component: RanksIndexA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/ranks/create', name: 'RanksCreateA', component: RanksCreateA, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/ranks/details/:id', name: 'RanksDetailsA', component: RanksDetailsA, props: true, meta: { loginOnly: true, adminOnly: true } },
  { path: '/admin/ranks/edit/:id', name: 'RanksEditA', component: RanksEditA, props: true, meta: { loginOnly: true, adminOnly: true } },

  // Fallback
  { path: '*', name: '404', component: NotFound },
]

const router = new VueRouter({
  routes
})

export default router
