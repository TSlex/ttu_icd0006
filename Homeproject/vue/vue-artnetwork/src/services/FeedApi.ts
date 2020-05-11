import Axios from 'axios';
import store from "../store";

import { IPostDTO } from '@/types/IPostDTO';
import { CountResponseDTO } from './../types/Response/CountResponseDTO';

export abstract class FeedApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/feed/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getFeedCount(jwt: string | null): Promise<CountResponseDTO> {
    const url = "count";
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
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
    const response = await this.axios.get<IPostDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }
}
