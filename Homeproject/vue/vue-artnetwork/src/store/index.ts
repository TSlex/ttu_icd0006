import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { ILoginDTO } from '@/types/Identity/ILoginDTO';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO'
import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';

import { AccountApi } from '@/services/AccountApi';
import { FeedApi } from '@/services/FeedApi';

import JwtDecode from "jwt-decode";
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { IPostDTO } from '@/types/IPostDTO';
import { ProfileApi } from '@/services/ProfileApi';

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    jwt: null as string | null,

    // Feed
    feed: [] as IPostDTO[],
    feedCount: 0 as number,
    feedLoadedCount: -1,

    //Profile
    profile: null as IProfileDTO | null,
  },

  getters: {
    isAuthenticated(context, getters): boolean {
      return getters.getJwt !== null;
    },
    getJwt(context, actions): string | null {
      if (!context.jwt) {
        context.jwt = localStorage.getItem('jwt')
      }

      if (context.jwt) {
        const decode = JwtDecode(context.jwt!) as Record<string, string>;
        const jwtExpires = parseInt(decode.exp)

        if (Date.now() >= jwtExpires * 1000) {
          context.jwt = null
          localStorage.removeItem('jwt')
        }
      }

      return context.jwt;
    }
  },

  mutations: {
    setJwt(state, jwt: string | null) {
      if (jwt) {
        localStorage.setItem('jwt', jwt)
        state.jwt = jwt;
      } else {
        localStorage.removeItem('jwt')
      }
    },

    // Feed
    setFeedCount(state, feedCount: number) {
      state.feedCount = feedCount;
    },
    setFeed(state, feed: IPostDTO[]) {
      state.feed = feed;
    },
    addFeed(state, feed: IPostDTO[]) {
      // TODO: fix not unique
      feed.forEach(feed => state.feed.push(feed))
    },

    //Profiel
    setProfile(state, profile: IProfileDTO | null) {
      state.profile = profile;
    },
  },

  actions: {
    clearJwt(context): void {
      context.commit('setJwt', null);
    },

    // Account
    async loginUser(context, loginDTO: ILoginDTO): Promise<JwtResponseDTO> {
      const response = await AccountApi.userLogin(loginDTO);
      if (!(response.errors?.length > 0)) {
        context.commit('setJwt', response.token);
      }
      return response;
    },

    async registerUser(context, registerDTO: IRegisterDTO): Promise<ResponseDTO> {
      const response = await AccountApi.userRegister(registerDTO);
      return response;
    },

    // Feed
    async getFeedCount(context): Promise<CountResponseDTO> {
      const response = await FeedApi.getFeedCount(context.state.jwt);
      context.commit('setFeedCount', response.count)
      return response;
    },

    async getFeed(context, pageNumber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNumber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('addFeed', response)
      return response;
    },

    async setFeed(context, pageNUmber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNUmber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('setFeed', response);
      return response;
    },

    //Profile
    async getProfile(context, username: string): Promise<IProfileDTO> {
      const response = await ProfileApi.getProfile(username, context.state.jwt);
      if (!(response.errors?.length > 0)) {
        context.commit('setProfile', response);
      } else {
        context.commit('setProfile', null);
      }
      return response;
    },

    async profileFollow(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.follow(username, context.state.jwt);
      return response;
    },

    async profileUnfollow(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.unfollow(username, context.state.jwt);
      return response;
    },

    async profileBlock(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.block(username, context.state.jwt);
      return response;
    },

    async profileUnblock(context, username: string): Promise<ResponseDTO> {
      const response = await ProfileApi.unblock(username, context.state.jwt);
      return response;
    },
  },

  modules: {
  }
})
