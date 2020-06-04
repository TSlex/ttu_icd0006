import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { AppState } from 'state/state';

@autoinject
export class BaseApi {

  protected fetchUrl: string;

  protected authHeaders = {
    'Authorization': 'Bearer '
  }

  constructor(protected appState: AppState, protected url: string, protected httpClient: HttpClient) {
    this.authHeaders['Authorization'] += this.appState.jwt;
    this.fetchUrl = this.appState.baseUrl + url + "/";
  }
}
