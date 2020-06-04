import { IResponseDTO } from './../types/Response/IResponseDTO';
import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { AppState } from 'state/state';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';

@autoinject
export class BaseApi {

  protected fetchUrl: string;

  protected authHeaders = {
    'Authorization': 'Bearer '
  }

  constructor(protected appState: AppState, protected url: string, protected httpClient: HttpClient) {
    this.authHeaders['Authorization'] += this.appState.jwt;
    this.fetchUrl = this.appState.baseUrl + url;
  }

  protected async _index<TData>(input: string | Request, init?: RequestInit): Promise<IFetchResponse<TData[]>> {
    try {
      const response = await this.httpClient.get(input, init)

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return {
            status: response.status.toString(),
            errors: [],
            data: (await response.json()) as TData[]
          }
        default:
          return {
            status: response.status.toString(),
            errors: [response.statusText.toString()],
            data: null
          }
      }
    } catch (reason) {
      return {
        status: "-1",
        errors: [reason],
        data: null
      }
    }
  }

  protected async _details<TData>(input: string | Request, init?: RequestInit): Promise<IFetchResponse<TData>> {
    try {
      const response = await this.httpClient.get(input, init)

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return {
            status: response.status.toString(),
            errors: [],
            data: (await response.json()) as TData
          }
        default:
          return {
            status: response.status.toString(),
            errors: [response.statusText.toString()],
            data: null
          }
      }
    } catch (reason) {
      return {
        status: "-1",
        errors: [reason],
        data: null
      }
    }
  }

  protected async _create<TData>(input: string | Request, body?: any, init?: RequestInit): Promise<IResponseDTO> {
    try {
      const response = await this.httpClient.post(input, body, init)

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return (await response.json()) as IResponseDTO
        default:
          return {
            status: response.status.toString(),
            errors: [response.statusText.toString()],
          }
      }
    } catch (reason) {
      return {
        status: "-1",
        errors: [reason],
      }
    }
  }

  protected async _edit<TData>(input: string | Request, body?: any, init?: RequestInit): Promise<IResponseDTO> {
    try {
      const response = await this.httpClient.put(input, body, init)

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return (await response.json()) as IResponseDTO
        default:
          return {
            status: response.status.toString(),
            errors: [response.statusText.toString()],
          }
      }
    } catch (reason) {
      return {
        status: "-1",
        errors: [reason],
      }
    }
  }

  protected async _delete<TData>(input: string | Request, init?: RequestInit): Promise<IResponseDTO> {
    try {
      const response = await this.httpClient.delete(input, {}, init)

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return (await response.json()) as IResponseDTO
        default:
          return {
            status: response.status.toString(),
            errors: [response.statusText.toString()],
          }
      }
    } catch (reason) {
      return {
        status: "-1",
        errors: [reason],
      }
    }
  }
}
