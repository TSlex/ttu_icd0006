import Axios from 'axios';
import { IBlockedProfileDTO } from './../types/IBlockedProfileDTO';
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { LanguageService } from './shared/LanguageService';
import { apiHost } from './_config';



export abstract class BlockedProfilesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: apiHost + "/api/v1/blockedprofiles/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getBlockedProfilesCount(jwt: string | null): Promise<CountResponseDTO> {
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

  static async getBlockedProfiles(pageNUmber: number, jwt: string | null): Promise<IBlockedProfileDTO[]> {
    const url = pageNUmber.toString();
    const response = await this.axios.get<IBlockedProfileDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
