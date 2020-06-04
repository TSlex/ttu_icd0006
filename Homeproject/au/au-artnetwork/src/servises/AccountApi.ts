import { IResponseDTO } from './../types/Response/IResponseDTO';
import { IJwtResponseDTO } from './../types/Response/IJwtResponseDTO';
import { IRegisterDTO } from './../types/Identity/IRegisterDTO';
import { autoinject } from 'aurelia-framework';
import { AppState } from 'state/state';
import { HttpClient, json } from 'aurelia-fetch-client';
import { BaseApi } from './BaseApi';
import { ILoginDTO } from 'types/Identity/ILoginDTO';


@autoinject
export class AccountApi extends BaseApi {

  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "identity", httpClient);
  }

  async login(loginModel: ILoginDTO): Promise<IJwtResponseDTO> {
    const url = `${this.fetchUrl}/login`;

    try {
      const response = await this.httpClient.post(url, JSON.stringify(loginModel))

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return (await response.json()) as IJwtResponseDTO
        default:
          return (await response.json()) as IJwtResponseDTO
      }
    } catch (reason) {
      return {
        errors: ["Authorisation fails"]
      } as IJwtResponseDTO
    }
  }

  async register(registerModel: IRegisterDTO): Promise<IResponseDTO> {
    const url = `${this.fetchUrl}/register`;

    try {
      const response = await this.httpClient.post(url, JSON.stringify(registerModel))

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return (await response.json()) as IResponseDTO
        default:
          return (await response.json()) as IResponseDTO
      }
    } catch (reason) {
      return {
        errors: ["Authorisation fails"]
      } as IResponseDTO
    }
  }
}
