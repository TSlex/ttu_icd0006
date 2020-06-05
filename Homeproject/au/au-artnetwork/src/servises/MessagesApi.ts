import { IResponseDTO } from './../types/Response/IResponseDTO';
import { IMessagePostDTO } from './../types/IMessageDTO';
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
    const url = `${this.appState.baseUrl}/chatrooms/${chatRoomId}/1`;

    console.log(url)

    return await this._index<IMessageGetDTO>(url, {headers: this.headers})
  }

  async Create(model: IMessagePostDTO): Promise<IResponseDTO> {

    return await this._create<IMessageGetDTO>("", model, this.headers as RequestInit)
  }

  async Edit(id: string, model: IMessagePostDTO): Promise<IResponseDTO> {
    const url = `${this.fetchUrl}/${id}`;

    return await this._edit<IMessageGetDTO>(url, model, this.headers as RequestInit)
  }

  async Delete(id: string): Promise<IResponseDTO> {
    const url = `${this.fetchUrl}/${id}`;

    return await this._edit<IMessageGetDTO>(url, this.headers as RequestInit)
  }
}
