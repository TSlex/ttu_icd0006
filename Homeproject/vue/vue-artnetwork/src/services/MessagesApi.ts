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
        Authorization: 'Bearer ' + store.getters.jwt
      }
    }
  )

  static async postMessage(message: IMessagePostDTO): Promise<ResponseDTO> {
    const url = ``;
    const response = await this.axios.post<ResponseDTO>(url, message);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async putMessage(id: string, message: IMessagePutDTO): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.put<ResponseDTO>(url, message);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async deleteMessage(id: string): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.delete<ResponseDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}