import { LanguageService } from './shared/LanguageService';
import { IImageDTO, IImagePostDTO, IImagePutDTO } from './../types/IImageDTO';
import { ResponseDTO } from './../types/Response/ResponseDTO';
import { IProfileDTO } from './../types/IProfileDTO';
import Axios from 'axios';

export abstract class ImagesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/images/",
      headers: {
        common: {
          'Content-Type': 'image/jpeg'
        },
      },
      responseType: 'arraybuffer'
    }
  )

  static _imageEncode(arrayBuffer: ArrayBuffer) {
    let image = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    return `data:image/jpeg;base64,${image}`
  }

  static async getImageModel(id: string = '', jwt: string | null): Promise<IImageDTO> {
    const url = `${id}/model`;
    const response = await this.axios.get(url,
      { headers: { Authorization: 'Bearer ' + jwt, common: { 'Content-Type': 'multipart/form-data' }, 'accept-language': this.culture }, responseType: 'json' });

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

  static async postImageModel(imageModel: IImagePostDTO, jwt: string | null): Promise<IImageDTO> {
    const url = "";

    let formData = new FormData();

    formData.append('imageFor', imageModel.imageFor.toString())
    formData.append('imageType', imageModel.imageType.toString())
    formData.append('paddingTop', imageModel.paddingTop.toString())
    formData.append('paddingRight', imageModel.paddingRight.toString())
    formData.append('paddingBottom', imageModel.paddingBottom.toString())
    formData.append('paddingLeft', imageModel.paddingLeft.toString())
    formData.append('widthPx', imageModel.widthPx.toString())
    formData.append('heightPx', imageModel.heightPx.toString())
    formData.append('imageFile', imageModel.imageFile ? imageModel.imageFile : '')

    const response = await this.axios.post(url, formData,
      { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture }, responseType: "json" });

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

  static async putImageModel(id: string = '', imageModel: IImagePutDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = id;

    let formData = new FormData();

    formData.append('id', imageModel.id)
    formData.append('paddingTop', imageModel.paddingTop.toString())
    formData.append('paddingRight', imageModel.paddingRight.toString())
    formData.append('paddingBottom', imageModel.paddingBottom.toString())
    formData.append('paddingLeft', imageModel.paddingLeft.toString())
    formData.append('widthPx', imageModel.widthPx.toString())
    formData.append('heightPx', imageModel.heightPx.toString())
    formData.append('imageFile', imageModel.imageFile ? imageModel.imageFile : '')

    const response = await this.axios.put(url, formData,
      { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture }, responseType: "json" });

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

  static async getImage(id: string = ''): Promise<string> {
    const url = id;
    const response = await this.axios.get(url, { headers: { 'Cache-Control': 'no-cache', 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
        return this._imageEncode(response.data);
      default:
        console.log(response.status + ":" + response.statusText)
        return this._imageEncode(response.data);
    }
  }

  static async getOriginalImage(id: string = ''): Promise<string> {
    const url = `${id}/original`;
    const response = await this.axios.get(url, { headers: { 'Cache-Control': 'no-cache', 'accept-language': this.culture } });

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
      case 201:
      case 204:
        return this._imageEncode(response.data);
      default:
        console.log(response.status + ":" + response.statusText)
        return this._imageEncode(response.data);
    }
  }

  static async getPostImage(postId: string) {
    const url = `post/${postId}`;
    const response = await this.axios.get(url);

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return this._imageEncode(response.data);
      default:
        console.log(response.status + ":" + response.statusText)
        return this._imageEncode(response.data);
    }
  }

  static async getGiftImage(giftId: string) {
    const url = `gift/${giftId}`;
    const response = await this.axios.get(url);

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return this._imageEncode(response.data);
      default:
        console.log(response.status + ":" + response.statusText)
        return this._imageEncode(response.data);
    }
  }
}
