import { IChatMemberDTO } from './../types/IChatMemberDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { LanguageService } from './shared/LanguageService';



export abstract class ChatMembersApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/chatmembers/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getChatMembers(chatRoomId: string, jwt: string | null): Promise<IChatMemberDTO[]> {
    const url = chatRoomId;
    const response = await this.axios.get<IChatMemberDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async setMemberRole(id: string, chatRole: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}/${chatRole}/set`

    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async deleteChatMember(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`
    const response = await this.axios.delete<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
