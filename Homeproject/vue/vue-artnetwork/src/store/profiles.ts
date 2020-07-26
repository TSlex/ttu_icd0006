import { IProfileDTO } from '@/types/IProfileDTO';
import { IFollowerDTO } from '@/types/IFollowerDTO';
import { ProfilesApi } from '@/services/ProfilesApi';
import { ResponseDTO } from '@/types/Response/ResponseDTO';

interface IState {
  profile: IProfileDTO | null;
}

export const ProfilesModule = {
  state: { profile: null as IProfileDTO | null, },
  getters: {},
  mutations: {
    setProfile(state: IState, profile: IProfileDTO | null) {
      state.profile = profile;
    },

    profileUnfollow(state: any, username: string) {
      state.followers.forEach((element: IFollowerDTO, index: number) => {
        if (element.userName === username) {
          state.followers.splice(index, 1);
        }
      });

      if (state.profile) {
        state.profile.followedCount -= 1;
      }
    },
  },
  actions: {
    async getProfile(context: any, username: string): Promise<IProfileDTO> {
      const response = await ProfilesApi.getProfile(username, context.state.jwt);
      context.commit('setProfile', response);
      return response;
    },

    async profileFollow(context: any, username: string): Promise<ResponseDTO> {
      const response = await ProfilesApi.follow(username, context.state.jwt);

      if (!response.errors && context.state.profile) {
        context.dispatch("getProfile", username);
      }

      return response;
    },

    async profileUnfollow(context: any, username: string): Promise<ResponseDTO> {
      const response = await ProfilesApi.unfollow(username, context.state.jwt);

      context.commit('profileUnfollow', username)

      if (!response.errors && context.state.profile) {
        context.dispatch("getProfile", username);
      }

      return response;
    },

    async profileBlock(context: any, username: string): Promise<ResponseDTO> {
      const response = await ProfilesApi.block(username, context.state.jwt);

      if (!response.errors && context.state.profile) {
        context.dispatch("getProfile", username);
      }

      return response;
    },

    async profileUnblock(context: any, username: string): Promise<ResponseDTO> {
      const response = await ProfilesApi.unblock(username, context.state.jwt);

      if (!response.errors && context.state.profile) {
        context.dispatch("getProfile", username);
      }

      return response;
    },
  }
}
