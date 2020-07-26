import { IFavoriteDTO } from '@/types/IFavoriteDTO';
import { FavoritesApi } from '@/services/FavoritesApi';

interface IState {
  favorites: IFavoriteDTO[];
}

export const FavoritesModule = {
  state: { favorites: [] as IFavoriteDTO[], },
  getters: {},
  mutations: {},
  actions: {
    async getFavorites(context: any, params: { postId: string; pageNumber: number }): Promise<IFavoriteDTO[]> {
      const response = await FavoritesApi.getFavorites(params.postId, params.pageNumber, context.state.jwt);
      return response;
    },
  }
}
