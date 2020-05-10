import Axios from 'axios';
import store from "../store";

import { ResponseDTO } from '@/types/Response/ResponseDTO';
import { IMessagePostDTO, IMessagePutDTO } from '@/types/IMessageDTO';



export abstract class MessagesApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/messages/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        },
      }
    }
  )

  static async postMessage(message: IMessagePostDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = ``;
    const response = await this.axios.post<ResponseDTO>(url, message, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async putMessage(id: string, message: IMessagePutDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.put<ResponseDTO>(url, message, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async deleteMessage(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.delete<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
