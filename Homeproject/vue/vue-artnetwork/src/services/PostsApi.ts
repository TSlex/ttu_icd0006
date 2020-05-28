import { IPostPostDTO, IPostPutDTO, IPostDTO } from './../types/IPostDTO';
import { CountResponseDTO } from '@/types/Response/CountResponseDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import Axios from 'axios';



export abstract class PostsApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/posts/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        },
      }
    }
  )

  static async getFavoriteCount(postId: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${postId}/fav_count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 }
    }
  }

  static async getCommentsCount(postId: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${postId}/comments_count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 }
    }
  }

  static async getProfilePostsCount(userName: string, jwt: string | null): Promise<CountResponseDTO> {
    const url = `${userName}/count`;
    const response = await this.axios.get<CountResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return { count: 0 };
    }
  }

  static async getProfilePosts(userName: string, pageNumber: number, jwt: string | null): Promise<IPostDTO[]> {
    const url = `${userName}/${pageNumber}`;
    const response = await this.axios.get<IPostDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return [];
    }
  }

  static async getPost(postId: string, jwt: string | null): Promise<IPostDTO> {
    const url = `${postId}`;
    const response = await this.axios.get<IPostDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async postPost(post: IPostPostDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = ``;
    const response = await this.axios.post<ResponseDTO>(url, post, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async putPost(id: string, post: IPostPutDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}`;
    const response = await this.axios.put<ResponseDTO>(url, post, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async deletePost(id: string, jwt: string | null): Promise<ResponseDTO> {
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

  static async favorite(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}/favorite`;
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt } });

    console.log(response)

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async unfavorite(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${id}/unfavorite`;
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt } });

    console.log(response)

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}