import { i18n } from './../translations/i18n';
import { LanguageService } from './shared/LanguageService';
import Axios from 'axios';
import { ILoginDTO } from '../types/Identity/ILoginDTO';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO';
import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';
import { IProfilePasswordDTO } from '@/types/Identity/IProfilePasswordDTO';
import { IProfileEmailDTO } from '@/types/Identity/IProfileEmailDTO';
import { IProfileDataDTO } from '@/types/Identity/IProfileDataDTO';
import { parseResponse } from '@/helpers/responseParcer';
import { IDeleteDTO } from '@/types/Identity/IDeleteDTO';


export abstract class AccountApi extends LanguageService {
  private static axios = Axios.create(
    {
      validateStatus: () => true,
      baseURL: "https://localhost:5001/api/v1/identity/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async userLogin(loginDTO: ILoginDTO): Promise<JwtResponseDTO> {
    const url = "login";

    const response = await this.axios.post(url, loginDTO);

    switch (response.status) {
      case 200:
      case 201:
      case 204:
      case 404:
        return response.data as JwtResponseDTO
      default:
        return {
          errors: [i18n.t('views.identity.AuthFailed')]
        } as JwtResponseDTO
    }
  }

  static async userRegister(registerDTO: IRegisterDTO): Promise<ResponseDTO> {
    const url = "register"
    const response = await this.axios.post(url, registerDTO);

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as ResponseDTO
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }

  static async getEmail(jwt: string | null): Promise<string> {
    const url = "getemail"
    const response = await this.axios.get(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as string
      default:
        return "";
    }
  }

  static async getProfileData(jwt: string | null): Promise<IProfileDataDTO | null> {
    const url = "getprofiledata"
    const response = await this.axios.get(url, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as IProfileDataDTO
      default:
        return null;
    }
  }

  static async putEmail(emailModel: IProfileEmailDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = "updateprofileemail"
    const response = await this.axios.put(url, emailModel, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as ResponseDTO
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }

  static async putPassword(passwordModel: IProfilePasswordDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = "updateprofilepassword"
    const response = await this.axios.put(url, passwordModel, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as ResponseDTO
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }

  static async putProfileData(dataModel: IProfileDataDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = "updateprofiledata"
    const response = await this.axios.put(url, dataModel, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as ResponseDTO
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }

  static async deleteProfile(id: string, model: IDeleteDTO, jwt: string | null): Promise<ResponseDTO> {
    const url = `deleteprofile/${id}`
    const response = await this.axios.post(url, model, { headers: { Authorization: 'Bearer ' + jwt, 'accept-language': this.culture } });

    switch (response.status) {
      case 200:
      case 201:
      case 204:
        return response.data as ResponseDTO
      default:
        console.log(response.status + ":" + response.statusText)
        return parseResponse(response.data)
    }
  }
}
