import Axios from 'axios';
import store from "../store";

import { IPostDTO } from '@/types/IPostDTO';
import { CountResponseDTO } from './../types/Response/CountResponseDTO';
import { LanguageService } from './shared/LanguageService';
import { apiHost } from './_config';

export abstract class FeedApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: apiHost + "/api/v1/feed/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getFeedCount(jwt: string | null): Promise<CountResponseDTO> {
    const url = "count";
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

  static async getFeed(pageNUmber: number, jwt: string | null): Promise<IPostDTO[]> {
    const url = pageNUmber.toString();
    const response = await this.axios.get<IPostDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
