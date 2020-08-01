import { ICommentDTO, ICommentPostDTO, ICommentPutDTO } from './../types/ICommentDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { LanguageService } from './shared/LanguageService';
import { parseResponse } from '@/helpers/responseParcer';



export abstract class CommentsApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/comments/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async getComments(postId: string, pageNumber: number, jwt: string | null): Promise<ICommentDTO[]> {
    const url = `${postId}/${pageNumber}`;
    const response = await this.axios.get<ICommentDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async postComment(comment: ICommentPostDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = ``;
    const response = await this.axios.post<ResponseDTO>(url, comment, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async putComment(id: string, comment: ICommentPutDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.put<ResponseDTO>(url, comment, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async deleteComment(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.delete<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
