import { IPostAdminDTO } from '@/types/IPostDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import Axios from 'axios';
import { LanguageService } from '../shared/LanguageService';



export abstract class PostsApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/admin/adminposts/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async index(jwt: string | null): Promise<IPostAdminDTO[]> {
    const url = "";
    const response = await this.axios.get<IPostAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async history(id: string, jwt: string | null): Promise<IPostAdminDTO[]> {
    const url = "history/" + id;
    const response = await this.axios.get<IPostAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async details(id: string, jwt: string | null): Promise<IPostAdminDTO> {
    const url = id;
    const response = await this.axios.get<IPostAdminDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async create(model: IPostAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = "";
    const response = await this.axios.post<ResponseDTO>(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async edit(id: string, model: IPostAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = id;
    const response = await this.axios.put<ResponseDTO>(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
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
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async restore(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = "restore/" + id;
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
