import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApi } from 'servises/BaseApi';
import { AppState } from 'state/state';
import { IChatRoomDTO } from 'types/IChatRoomDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';

@autoinject
export class ChatRoomsApi extends BaseApi {

  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "chatrooms", httpClient);
  }

  async Index(): Promise<IFetchResponse<IChatRoomDTO[]>> {
    const url = `${this.fetchUrl}`;

    return await this._index<IChatRoomDTO>(url, {headers: this.headers})
  }
}
