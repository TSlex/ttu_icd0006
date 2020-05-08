import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { ILoginDTO } from '@/types/Identity/ILoginDTO';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO';

import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';

import { AccountApi } from '@/services/AccountApi';
import { FeedApi } from '@/services/FeedApi';

import JwtDecode from "jwt-decode";
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { IPostDTO } from '@/types/IPostDTO';

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    jwt: null as string | null,

    // Feed
    feed: [] as IPostDTO[],
    feedCount: 0 as number,
    feedLoadedCount: -1
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
    }
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
      console.log(pageNumber);
      const response = await FeedApi.getFeed(pageNumber, context.state.jwt);
      console.log(response);
      context.state.feedLoadedCount = response.length;
      context.commit('addFeed', response)
      return response;
    },

    async setFeed(context, pageNUmber: number): Promise<IPostDTO[]> {
      const response = await FeedApi.getFeed(pageNUmber, context.state.jwt);
      context.state.feedLoadedCount = response.length;
      context.commit('setFeed', response);
      return response;
    }
  },

  modules: {
  }
})
