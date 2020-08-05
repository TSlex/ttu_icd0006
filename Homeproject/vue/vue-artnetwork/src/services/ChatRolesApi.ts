import { LanguageService } from './shared/LanguageService';
import { IChatRoleDTO } from '../types/IChatRoleDTO';
import Axios from 'axios';
import { apiHost } from './_config';



export abstract class ChatRolesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: apiHost + "/api/v1/chatroles/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getChatRoles(jwt: string | null): Promise<IChatRoleDTO[]> {
    const url = "";
    const response = await this.axios.get<IChatRoleDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
