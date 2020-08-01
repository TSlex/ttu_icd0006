import { LanguageService } from './shared/LanguageService';
import { IGiftDTO } from './../types/IGiftDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { IProfileGiftDTO, IProfileGiftPostDTO } from '@/types/IProfileGiftDTO';
import { parseResponse } from '@/helpers/responseParcer';



export abstract class GiftsApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/gifts/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getGiftsCount(jwt: string | null): Promise<CountResponseDTO> {
    const url = `count`;
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

  static async getGifts(pageNUmber: number, jwt: string | null): Promise<IGiftDTO[]> {
    const url = `${pageNUmber}`
    const response = await this.axios.get<IGiftDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async getProfileGiftsCount(userName: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${userName}/count`;
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

  static async getProfileGifts(userName: string, pageNUmber: number, jwt: string | null): Promise<IProfileGiftDTO[]> {
    const url = `${userName}/${pageNUmber}`
    const response = await this.axios.get<IProfileGiftDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async sendGiftToUsername(userName: string, gift: IProfileGiftPostDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `${userName}/send`
    const response = await this.axios.post<ResponseDTO>(url, gift, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async deleteProfileGift(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = id
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
}
