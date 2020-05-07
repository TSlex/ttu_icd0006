import Axios from 'axios';
import { ILoginDTO } from '../types/Identity/ILoginDTO';
import { IRegisterDTO } from '@/types/Identity/IRegisterDTO';
import { JwtResponseDTO } from '@/types/Response/JwtResponseDTO';
import { ResponseDTO } from '@/types/Response/ResponseDTO';


export abstract class AccountApi {
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
      case 404:
        return response.data as JwtResponseDTO
      default:
        return {
          errors: ["Authorisation fails"]
        } as JwtResponseDTO
    }
  }

  static async userRegister(registerDTO: IRegisterDTO): Promise<ResponseDTO> {
    const url = "register"
    const response = await this.axios.post(url, registerDTO);

    switch (response.status) {
      case 200:
      case 404:
      case 400:
        return response.data as ResponseDTO
      default:
        return {
          errors: ["Authorisation fails"]
        } as ResponseDTO
    }
  }
}
