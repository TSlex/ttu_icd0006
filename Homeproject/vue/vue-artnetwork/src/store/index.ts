import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { ILoginDTO } from '@/types/Identity/ILoginDTO';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO';

import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';

import { AccountApi } from '@/services/AccountApi';

import JwtDecode from "jwt-decode";

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    jwt: null as string | null
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
    }
  },
  actions: {
    clearJwt(context): void {
      context.commit('setJwt', null);
    },

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
    }
  },

  modules: {
  }
})
