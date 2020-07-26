import { IRankDTO } from '@/types/IRankDTO';
import { RanksApi } from '@/services/RanksApi';

interface IState {
  profileRank: IRankDTO | null;
}

export const RanksModule = {
  state: { profileRank: null as IRankDTO | null, },
  getters: {
    getRankPercent(context: any): number {
      let profile = context.profile;
      let rank = context.profileRank;

      if (profile && rank && rank.maxExperience - rank.minExperience !== 0) {
        let minExperience = rank.minExperience >= 0 ? rank.minExperience : 0;

        return (
          Math.round(
            ((profile.experience - minExperience) /
              (rank.maxExperience - minExperience)) *
            100 *
            100
          ) / 100
        );
      }
      return 0;
    },
  },
  mutations: {
    setProfileRank(state: IState, rank: IRankDTO) {
      state.profileRank = rank;
    }
  },
  actions: {
    async getProfileRank(context: any, userName: string): Promise<IRankDTO> {
      const response = await RanksApi.getProfileRank(userName, context.state.jwt);
      context.commit('setProfileRank', response)
      return response;
    }
  }
}
