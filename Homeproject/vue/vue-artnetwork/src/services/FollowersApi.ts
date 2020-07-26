import { IFollowerDTO } from './../types/IFollowerDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { IFavoriteDTO } from '@/types/IFavoriteDTO';
import { LanguageService } from './shared/LanguageService';



export abstract class FollowersApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/followers/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getFollowersCount(userName: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${userName}/followers/count`;
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

  static async getFollowers(userName: string, pageNUmber: number, jwt: string | null): Promise<IFollowerDTO[]> {
    const url = `${userName}/followers/${pageNUmber}`
    const response = await this.axios.get<IFollowerDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async getFollowedCount(userName: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${userName}/followed/count`;
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

  static async getFollowed(userName: string, pageNUmber: number, jwt: string | null): Promise<IFollowerDTO[]> {
    const url = `${userName}/followed/${pageNUmber}`
    const response = await this.axios.get<IFollowerDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
