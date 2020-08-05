import { IFavoriteDTO } from './../types/IFavoriteDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { LanguageService } from './shared/LanguageService';
import { apiHost } from './_config';



export abstract class FavoritesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: apiHost + "/api/v1/favorites/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getFavoritesCount(postId: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${postId}/count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return {
          count: 0
        };
    }
  }

  static async getFavorites(postId: string, pageNumber: number, jwt: string | null): Promise<IFavoriteDTO[]> {
    const url = `${postId}/${pageNumber}`
    const response = await this.axios.get<IFavoriteDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }
}
