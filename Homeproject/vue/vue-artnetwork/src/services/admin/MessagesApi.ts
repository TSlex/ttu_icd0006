import { IMessageAdminDTO } from '@/types/IMessageDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import Axios from 'axios';
import { LanguageService } from '../shared/LanguageService';
import { parseResponse } from '@/helpers/responseParcer';



export abstract class MessagesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/admin/adminmessages/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async index(jwt: string | null): Promise<IMessageAdminDTO[]> {
    const url = "";
    const response = await this.axios.get<IMessageAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async history(id: string, jwt: string | null): Promise<IMessageAdminDTO[]> {
    const url = "history/" + id;
    const response = await this.axios.get<IMessageAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async details(id: string, jwt: string | null): Promise<IMessageAdminDTO> {
    const url = id;
    const response = await this.axios.get<IMessageAdminDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }

  static async create(model: IMessageAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = "";
    const response = await this.axios.post<ResponseDTO>(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }

  static async edit(id: string, model: IMessageAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = id;
    const response = await this.axios.put<ResponseDTO>(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
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
        return parseResponse(response.data)
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
        return parseResponse(response.data)
    }
  }
}
