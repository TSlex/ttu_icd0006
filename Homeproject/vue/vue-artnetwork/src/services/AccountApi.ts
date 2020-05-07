import { ILoginDTO } from './../types/ILoginDTO';
import Axios from 'axios';
import { IRegisterDTO } from '@/types/IRegisterDTO';

interface ILoginResponse {
  token: string;
  status: string;
}

interface IRegisterResponse {
  token: string;
  status: string;
}

export abstract class AccountApi {
  private static axios = Axios.create(
    {
      baseURL: "https://localhost:5001/api/v1/identity/",
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    }
  )

  static async userLogin(loginDTO: ILoginDTO): Promise<string | null> {
    const url = "login";
    try {
      const response = await this.axios.post<ILoginResponse>(url, loginDTO);
      console.log('login response', response);
      if (response.status === 200) {
        return response.data.token;
      }
      return null;
    } catch (error) {
      console.log('error: ', (error as Error).message);
      return null;
    }
  }

  static async userRegister(registerDTO: IRegisterDTO): Promise<string | null> {
    const url = "register"
    try {
      const response = await this.axios.post<IRegisterResponse>(url, registerDTO)
      console.log('registration response', response);
      if (response.status === 200) {
        return "Registration succed";
      }
      return null;
    } catch (error) {
      console.log('error: ', (error as Error).message);
      return null;
    }
  }
}
