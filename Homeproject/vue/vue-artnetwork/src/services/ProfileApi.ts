import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";



export abstract class ProfileApi {
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

  static async getProfile(userName: string, jwt: string | null): Promise<IProfileDTO> {
    const url = userName;

    let response;

    if (jwt) {
      response = await this.axios.get<IProfileDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });
    } else {
      response = await this.axios.get<IProfileDTO>(url);
    }

    switch (response.status) {
      case 200:
      case 404:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return {
          errors: ["Server error"]
        } as IProfileDTO;
    }
  }

  static async follow(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${userName}/follow`
    const response = await this.axios.get<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async unfollow(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${userName}/unfollow`
    const response = await this.axios.get<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async block(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${userName}/block`
    const response = await this.axios.get<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt } });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async unblock(userName: string, jwt: string | null): Promise<ResponseDTO> {
    const url = `${userName}/unblock`
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
