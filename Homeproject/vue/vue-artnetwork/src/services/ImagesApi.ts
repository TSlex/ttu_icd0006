import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';
import store from "../store";


export abstract class ImagesApi {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/images/",
      headers: {
        common: {
          'Content-Type': 'image/jpeg'
        },
        Authorization: 'Bearer ' + store.getters.jwt
      },
      responseType: 'arraybuffer'
    }
  )

  static _imageEncode(arrayBuffer: ArrayBuffer) {
    let image = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    return `data:image/jpeg;base64,${image}`
  }

  static async getImage(id: string = ''): Promise<string> {
    const url = id;
    const response = await this.axios.get(url);

    switch (response.status) {
      case 200:
        return this._imageEncode(response.data);
      default:
        console.log(response.status + ":" + response.statusText)
        return this._imageEncode(response.data);
    }
  }

  static async getProfileImage(userName: string) {
    const url = `profile/${userName}`;
    const response = await this.axios.get(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async getPostImage(postId: string) {
    const url = `post/${postId}`;
    const response = await this.axios.get(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }

  static async getGiftImage(giftId: string) {
    const url = `gift/${giftId}`;
    const response = await this.axios.get(url);

    switch (response.status) {
      case 200:
        return response.data;
      default:
        console.log(response.status + ":" + response.statusText)
        return response.data;
    }
  }
}
