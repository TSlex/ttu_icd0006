import { IFollowerDTO } from '@/types/IFollowerDTO';
import { FollowersApi } from '@/services/FollowersApi';

interface IState {
  followers: IFollowerDTO[];
}

export const FollowersModule = {
  state: {
    followers: [] as IFollowerDTO[],
  },
  getters: {},
  mutations: {
    setFollowers(state: IState, followers: IFollowerDTO[]) {
      state.followers = followers;
    },

  },
  actions: {
    async getFollowers(context: any, params: { userName: string; pageNumber: number }): Promise<IFollowerDTO[]> {
      const response = await FollowersApi.getFollowers(params.userName, params.pageNumber, context.state.jwt);
      context.commit('setFollowers', response)
      return response;
    },
    async getFollowed(context: any, params: { userName: string; pageNumber: number }): Promise<IFollowerDTO[]> {
      const response = await FollowersApi.getFollowed(params.userName, params.pageNumber, context.state.jwt);
      context.commit('setFollowers', response)
      return response;
    },
  }
}
