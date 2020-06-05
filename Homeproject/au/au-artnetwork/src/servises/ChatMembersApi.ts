import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApi } from 'servises/BaseApi';
import { AppState } from 'state/state';
import { IChatMemberDTO } from 'types/IChatMemberDTO';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';

@autoinject
export class ChatMembersApi extends BaseApi {

  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "chatmembers", httpClient);
  }

  async Index(chatRoomId: string): Promise<IFetchResponse<IChatMemberDTO[]>> {
    const url = `${this.fetchUrl}/${chatRoomId}`;

    return await this._index<IChatMemberDTO>(url, {headers: this.headers})
  }
}
