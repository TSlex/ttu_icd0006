import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApi } from 'servises/BaseApi';
import { AppState } from 'state/state';

@autoinject
export class ChatRoomsApi extends BaseApi {

  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "chatrooms", httpClient);
  }

}
