import { IPostPostDTO, IPostPutDTO, IPostDTO } from './../types/IPostDTO';
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import Axios from 'axios';
import { LanguageService } from './shared/LanguageService';
import { parseResponse } from '@/helpers/responseParcer';
import { apiHost } from './_config';



export abstract class PostsApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: apiHost + "/api/v1/posts/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        },
      }
    }
  )

  static async getFavoriteCount(postId: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${postId}/fav_count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 }
    }
  }

  static async getCommentsCount(postId: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${postId}/comments_count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 }
    }
  }

  static async getProfilePostsCount(userName: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${userName}/count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 };
    }
  }

  static async getProfilePosts(userName: string, pageNumber: number, jwt: string | null): Promise<IPostDTO[]> {
    const url = `${userName}/${pageNumber}`;
    const response = await this.axios.get<IPostDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async getPost(postId: string, jwt: string | null): Promise<IPostDTO> {
    const url = `${postId}`;
    const response = await this.axios.get<IPostDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async postPost(post: IPostPostDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = ``;
    const response = await this.axios.post<ResponseDTO>(url, post, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async putPost(id: string, post: IPostPutDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.put<ResponseDTO>(url, post, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async deletePost(id: string, jwt: string | null): Promise<ResponseDTO> {
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

  static async favorite(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}/favorite`;
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async unfavorite(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}/unfavorite`;
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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
