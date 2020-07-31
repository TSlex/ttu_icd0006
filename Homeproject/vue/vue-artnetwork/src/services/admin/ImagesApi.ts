import { IImageAdminDTO } from '@/types/IImageDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import Axios from 'axios';
import { LanguageService } from '../shared/LanguageService';



export abstract class ImagesApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/admin/adminimages/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async index(jwt: string | null): Promise<IImageAdminDTO[]> {
    const url = "";
    const response = await this.axios.get<IImageAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async history(id: string, jwt: string | null): Promise<IImageAdminDTO[]> {
    const url = "history/" + id;
    const response = await this.axios.get<IImageAdminDTO[]>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async details(id: string, jwt: string | null): Promise<IImageAdminDTO> {
    const url = id;
    const response = await this.axios.get<IImageAdminDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async create(imageModel: IImageAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    let formData = new FormData();

    formData.append('imageFor', imageModel.imageFor ?? "null")
    formData.append('imageType', imageModel.imageType.toString())
    formData.append('paddingTop', imageModel.paddingTop.toString())
    formData.append('paddingRight', imageModel.paddingRight.toString())
    formData.append('paddingBottom', imageModel.paddingBottom.toString())
    formData.append('paddingLeft', imageModel.paddingLeft.toString())
    formData.append('widthPx', imageModel.widthPx.toString())
    formData.append('heightPx', imageModel.heightPx.toString())
    formData.append('imageFile', imageModel.imageFile ? imageModel.imageFile : '')

    const url = "";
    const response = await this.axios.post<ResponseDTO>(url, formData, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture }, responseType: "json" });

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

  static async edit(id: string, model: IImageAdminDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = id;
    const response = await this.axios.put<ResponseDTO>(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async delete(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = id;
    const response = await this.axios.delete<ResponseDTO>(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

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

  static async restore(id: string, jwt: string | null): Promise<ResponseDTO> {
    const url = "restore/" + id;
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
