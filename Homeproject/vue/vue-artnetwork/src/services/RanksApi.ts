import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { IRankDTO } from '@/types/IRankDTO';

import { LanguageService } from './shared/LanguageService';
import { parseResponse } from '@/helpers/responseParcer';
import { apiHost } from './_config';

export abstract class RanksApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: apiHost + "/api/v1/ranks/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        },
      }
    }
  )

  static async getProfileRanks(userName: string, jwt: string | null): Promise<IRankDTO[]> {
    const url = `${userName}/all`;
    const response = await this.axios.get<IRankDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async getProfileRank(userName: string, jwt: string | null): Promise<IRankDTO> {
    const url = `${userName}/active`;
    const response = await this.axios.get<IRankDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
