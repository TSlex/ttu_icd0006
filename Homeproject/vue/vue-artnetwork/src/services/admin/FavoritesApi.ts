import { ResponseDTO } from '@/types/Response/ResponseDTO';
import { IFavoriteAdminDTO } from '@/types/IFavoriteDTO';
import Axios from 'axios';
import { LanguageService } from '../shared/LanguageService';



export abstract class FavoritesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/admin/adminfavorites",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async index(jwt: string | null): Promise<IFavoriteAdminDTO[]> {
    const url = "";
    const response = await this.axios.get<IFavoriteAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async details(id: string, jwt: string | null): Promise<IFavoriteAdminDTO> {
    const url = id;
    const response = await this.axios.get<IFavoriteAdminDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async edit(id: string, model: IFavoriteAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = id;
    const response = await this.axios.put<ResponseDTO>(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async delete(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = id;
    const response = await this.axios.delete<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
