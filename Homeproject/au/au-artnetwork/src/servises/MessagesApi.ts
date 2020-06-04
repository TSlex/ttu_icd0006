import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApi } from 'servises/BaseApi';
import { AppState } from 'state/state';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { IMessageGetDTO } from 'types/IMessageDTO';

@autoinject
export class MessagesApi extends BaseApi {

  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "messages", httpClient);
  }

  async Index(chatRoomId: string): Promise<IFetchResponse<IMessageGetDTO[]>> {
    try {
      const response = await this.httpClient.get(this.fetchUrl + chatRoomId, { headers: this.authHeaders })

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return {
            status: response.status.toString(),
            errors: [],
            data: (await response.json()) as IMessageGetDTO[]
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

  async Create(chatRoomId: string): Promise<IFetchResponse<IMessageGetDTO[]>> {
    try {
      const response = await this.httpClient.post(this.fetchUrl + chatRoomId, {}, { headers: this.authHeaders })

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return {
            status: response.status.toString(),
            errors: [],
            data: (await response.json()) as IMessageGetDTO[]
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

  async Edit(chatRoomId: string): Promise<IFetchResponse<IMessageGetDTO[]>> {
    try {
      const response = await this.httpClient.put(this.fetchUrl + chatRoomId, {}, { headers: this.authHeaders })

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return {
            status: response.status.toString(),
            errors: [],
            data: (await response.json()) as IMessageGetDTO[]
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

  async Delete(chatRoomId: string): Promise<IFetchResponse<IMessageGetDTO[]>> {
    try {
      const response = await this.httpClient.delete(this.fetchUrl + chatRoomId, {}, { headers: this.authHeaders })

      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return {
            status: response.status.toString(),
            errors: [],
            data: (await response.json()) as IMessageGetDTO[]
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

}
