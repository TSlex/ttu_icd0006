import { RanksModule } from './modules/ranks';
import { ProfilesModule } from './modules/profiles';
import { PostsModule } from './modules/posts';
import { MessagesModule } from './modules/messages';
import { ImagesModule } from './modules/images';
import { GiftsModule } from './modules/gifts';
import { FollowersModule } from './modules/followers';
import { FeedModule } from './modules/feed';
import { FavoritesModule } from './modules/favorites';
import { CultureModule } from './modules/culture';
import { CommentsModule } from './modules/comments';
import { IdentityModule } from './modules/identity';

import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',

  state: {
    ...IdentityModule.state,
    ...CommentsModule.state,
    ...CultureModule.state,
    ...FavoritesModule.state,
    ...FeedModule.state,
    ...FollowersModule.state,
    ...GiftsModule.state,
    ...ImagesModule.state,
    ...MessagesModule.state,
    ...PostsModule.state,
    ...ProfilesModule.state,
    ...RanksModule.state,
  },

  getters: {
    ...IdentityModule.getters,
    ...CommentsModule.getters,
    ...CultureModule.getters,
    ...FavoritesModule.getters,
    ...FeedModule.getters,
    ...FollowersModule.getters,
    ...GiftsModule.getters,
    ...ImagesModule.getters,
    ...MessagesModule.getters,
    ...PostsModule.getters,
    ...ProfilesModule.getters,
    ...RanksModule.getters,
  },

  mutations: {
    ...IdentityModule.mutations,
    ...CommentsModule.mutations,
    ...CultureModule.mutations,
    ...FavoritesModule.mutations,
    ...FeedModule.mutations,
    ...FollowersModule.mutations,
    ...GiftsModule.mutations,
    ...ImagesModule.mutations,
    ...MessagesModule.mutations,
    ...PostsModule.mutations,
    ...ProfilesModule.mutations,
    ...RanksModule.mutations,
  },

  actions: {
    ...IdentityModule.actions,
    ...CommentsModule.actions,
    ...CultureModule.actions,
    ...FavoritesModule.actions,
    ...FeedModule.actions,
    ...FollowersModule.actions,
    ...GiftsModule.actions,
    ...ImagesModule.actions,
    ...MessagesModule.actions,
    ...PostsModule.actions,
    ...ProfilesModule.actions,
    ...RanksModule.actions,
  },

  // modules: {
  //   IdentityModule,
  //   CommentsModule,
  //   CultureModule,
  //   FavoritesModule,
  //   feed: FeedModule,
  //   FollowersModule,
  //   GiftsModule,
  //   ImagesModule,
  //   MessagesModule,
  //   PostsModule,
  //   ProfilesModule,
  //   RanksModule
  // },
})
