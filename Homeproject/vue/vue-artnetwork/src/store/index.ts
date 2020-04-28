import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { ILoginDTO } from '@/types/ILoginDTO';
import { IRegisterDTO } from '@/types/IRegisterDTO';

import { AccountApi } from '@/services/AccountApi';

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    jwt: null as string | null
  },
  getters: {
    isAuthenticated(context): boolean {
      return context.jwt !== null;
    }
  },
  mutations: {
    setJwt(state, jwt: string | null) {
      state.jwt = jwt;
    }
  },
  actions: {
    clearJwt(context): void {
      context.commit('setJwt', null);
    },
    async loginUser(context, loginDTO: ILoginDTO): Promise<boolean> {
      const response = await AccountApi.userLogin(loginDTO);
      context.commit('setJwt', response);
      return response !== null;
    },
    async registerUser(context, registerDTO: IRegisterDTO): Promise<boolean> {
      const response = await AccountApi.userRegister(registerDTO);
      console.log(response);
      return response !== null;
    }
  },
  modules: {
  }
})
