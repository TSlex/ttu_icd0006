import { IProfileGiftDTO } from '@/types/IProfileGiftDTO';
import { GiftsApi } from '@/services/GiftsApi';
import { IGiftDTO } from '@/types/IGiftDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';

interface IState {
  profileGift: IProfileGiftDTO | null;
  profileGifts: IProfileGiftDTO[];
  giftsLoadedCount: number;
}

export const GiftsModule = {
  state: {
    profileGift: null as IProfileGiftDTO | null,
    profileGifts: [] as IProfileGiftDTO[],
    giftsLoadedCount: -1,
  },
  getters: {},
  mutations: {
    setProfileGift(state: IState, gift: IProfileGiftDTO | null) {
      state.profileGift = gift
    },

    setProfileGifts(state: IState, gifts: IProfileGiftDTO[]) {
      state.profileGifts = gifts;
    },
    deleteProfileGift(state: IState, profileGift: IProfileGiftDTO) {
      state.profileGifts.forEach((element: IProfileGiftDTO, index: any) => {
        if (element.id === profileGift.id) {
          state.profileGifts.splice(index, 1)
        }
      });
    },
  },
  actions: {
    async getGifts(context: any, pageNumber: number): Promise<IGiftDTO[]> {
      const response = await GiftsApi.getGifts(pageNumber, context.state.jwt);
      return response;
    },

    // ProfileGifts
    async getProfileGifts(context: any, params: { userName: string; pageNumber: number }): Promise<IProfileGiftDTO[]> {
      const response = await GiftsApi.getProfileGifts(params.userName, params.pageNumber, context.state.jwt);
      context.commit('setProfileGifts', response)
      return response;
    },
    async deleteProfileGift(context: any, profileGift: IProfileGiftDTO): Promise<ResponseDTO> {
      const response = await GiftsApi.deleteProfileGift(profileGift.id, context.state.jwt);
      context.commit('deleteProfileGift', profileGift);
      return response;
    },
  }
}
