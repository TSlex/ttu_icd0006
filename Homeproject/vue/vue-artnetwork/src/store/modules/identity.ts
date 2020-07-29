import JwtDecode from 'jwt-decode';
import { ILoginDTO } from '@/types/Identity/ILoginDTO';
import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { AccountApi } from '@/services/AccountApi';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';

interface IState {
  jwt: string | null;
}

export const IdentityModule = {
  state: { jwt: null as string | null, } as IState,
  getters: {
    isAuthenticated(state: IState, getters: any): boolean {
      return getters.getJwt !== null;
    },

    isAdmin(state: IState, getters: any) {
      let result: boolean = false
      getters.getUserRoles.forEach((element: string) => {
        if (element.toLowerCase().indexOf("admin") !== -1) {
          result = true;
        }
      });

      return result;
    },

    getUserName(state: IState, getters: any): string {
      if (getters.isAuthenticated) {
        const decoded = JwtDecode(state.jwt!) as Record<string, string>;
        return decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      }
      return "null";
    },
    getUserId(state: IState, getters: any): string {
      if (getters.isAuthenticated) {
        const decoded = JwtDecode(state.jwt!) as Record<string, string>;
        return decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      }
      return "null";
    },
    getUserRoles(state: IState, getters: any): string[] {
      if (getters.isAuthenticated) {
        const decoded = JwtDecode(state.jwt!) as Record<string, string>;
        return decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ].toString().split(',') as string[]
      }
      return [];
    },
    getJwt(state: IState): string | null {
      if (!state.jwt) {
        state.jwt = localStorage.getItem('jwt')
      }

      if (state.jwt) {
        const decode = JwtDecode(state.jwt!) as Record<string, string>;
        const jwtExpires = parseInt(decode.exp)

        if (Date.now() >= jwtExpires * 1000) {
          state.jwt = null
          localStorage.removeItem('jwt')
        }
      }

      return state.jwt;
    },
  },
  mutations: {
    setJwt(state: IState, jwt: string | null) {
      if (jwt) {
        localStorage.setItem('jwt', jwt)
      } else {
        localStorage.removeItem('jwt')
      }

      state.jwt = jwt;
    },
  },
  actions: {
    clearJwt(context: any): void {
      context.commit('setJwt', null);
    },

    async loginUser(context: any, loginDTO: ILoginDTO): Promise<JwtResponseDTO> {
      const response = await AccountApi.userLogin(loginDTO);
      if (!(response.errors?.length > 0)) {
        context.commit('setJwt', response.token);
      }
      return response;
    },

    async registerUser(context: any, registerDTO: IRegisterDTO): Promise<ResponseDTO> {
      const response = await AccountApi.userRegister(registerDTO);
      return response;
    },
  }
}
