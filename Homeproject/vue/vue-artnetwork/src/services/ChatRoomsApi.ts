import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { IChatRoomDTO, IChatRoomPutDTO } from './../types/IChatRoomDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { IMessageDTO } from '@/types/IMessageDTO';



export abstract class ChatRoomsApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/chatrooms/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getChatRooms(jwt: string | null): Promise<IChatRoomDTO[]> {
    const url = '';
    const response = await this.axios.get<IChatRoomDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async getLastMessage(chatRoomId: string, jwt: string | null): Promise<IMessageDTO> {
    const url = `${chatRoomId}/last`;
    const response = await this.axios.get<IMessageDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async getMessagesCount(chatRoomId: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${chatRoomId}/count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 };
    }
  }

  static async getMessages(chatRoomId: string, pageNumber: number, jwt: string | null): Promise<IMessageDTO[]> {
    const url = `${chatRoomId}/${pageNumber}`;
    const response = await this.axios.get<IMessageDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async getChatRoomWithUsername(userName: string, jwt: string | null): Promise<string | null> {
    const url = userName;
    const response = await this.axios.get<string>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return null;
    }
  }

  static async putChatTitle(chatRoomId: string, charRoom: IChatRoomPutDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `${chatRoomId}/rename`;
    const response = await this.axios.put<ResponseDTO>(url, charRoom, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async deleteChatRoom(chatRoomId: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${chatRoomId}/delete`;
    const response = await this.axios.get<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
