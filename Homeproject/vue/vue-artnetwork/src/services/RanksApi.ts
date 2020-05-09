import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { IRankDTO } from '@/types/IRankDTO';



export abstract class RanksApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/ranks/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        },
        Authorization: 'Bearer ' + store.getters.jwt
      }
    }
  )

  static async getProfileRanks(userName: string): Promise<IRankDTO[]> {
    const url = `${userName}/all`;
    const response = await this.axios.get<IRankDTO[]>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async getProfileRank(userName: string): Promise<IRankDTO> {
    const url = `${userName}/active`;
    const response = await this.axios.get<IRankDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}