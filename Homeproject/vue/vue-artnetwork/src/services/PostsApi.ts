import { IPostPostDTO, IPostPutDTO } from './../types/IPostDTO';
import { IPostDTO } from '@/types/IPostDTO';
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";



export abstract class PostsApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/posts/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        },
        Authorization: 'Bearer ' + store.getters.jwt
      }
    }
  )

  static async getFavoriteCount(postId: string): Promise<CountResponseDTO> {
    const url = `${postId}/fav_count`;
    const response = await this.axios.get<CountResponseDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 }
    }
  }

  static async getCommentsCount(postId: string): Promise<CountResponseDTO> {
    const url = `${postId}/comments_count`;
    const response = await this.axios.get<CountResponseDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 }
    }
  }

  static async getProfilePostsCount(userName: string): Promise<CountResponseDTO> {
    const url = `${userName}/count`;
    const response = await this.axios.get<CountResponseDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 };
    }
  }

  static async getProfilePosts(userName: string, pageNumber: number): Promise<IPostDTO[]> {
    const url = `${userName}/${pageNumber}`;
    const response = await this.axios.get<IPostDTO[]>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async getPost(postId: string): Promise<IPostDTO> {
    const url = `${postId}`;
    const response = await this.axios.get<IPostDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async postPost(post: IPostPostDTO): Promise<ResponseDTO> {
    const url = ``;
    const response = await this.axios.post<ResponseDTO>(url, post);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async putPost(id: string, post: IPostPutDTO): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.put<ResponseDTO>(url, post);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async deletePost(id: string): Promise<ResponseDTO> {
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

  static async favorite(id: string): Promise<ResponseDTO> {
    const url = `${id}/favorite`;
    const response = await this.axios.post<ResponseDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async unfavorite(id: string): Promise<ResponseDTO> {
    const url = `${id}/unfavorite`;
    const response = await this.axios.post<ResponseDTO>(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}