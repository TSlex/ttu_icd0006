import { RanksModule } from './ranks';
import { ProfilesModule } from './profiles';
import { PostsModule } from './posts';
import { MessagesModule } from './messages';
import { ImagesModule } from './images';
import { GiftsModule } from './gifts';
import { FollowersModule } from './followers';
import { FeedModule } from './feed';
import { FavoritesModule } from './favorites';
import { CultureModule } from './culture';
import { CommentsModule } from './comments';
import { IdentityModule } from './identity';

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
