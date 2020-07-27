import { ResponseDTO } from '../types/Response/ResponseDTO';
import { IProfileDTO } from '../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";
import { LanguageService } from './shared/LanguageService';



export abstract class ProfilesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/profiles/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async exists(userName: string): Promise<boolean> {
    const url = `${userName}/exists`;

    const response = await this.axios.get<boolean>(url);

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async getProfile(userName: string, jwt: string | null): Promise<IProfileDTO> {
    const url = userName;

    let response;

    if (jwt) {
      response = await this.axios.get<IProfileDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });
    } else {
      response = await this.axios.get<IProfileDTO>(url);
    }

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async follow(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `/${userName}/follow`
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async unfollow(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `/${userName}/unfollow`
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async block(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `/${userName}/block`
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async unblock(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `/${userName}/unblock`
    const response = await this.axios.post<ResponseDTO>(url, {}, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
