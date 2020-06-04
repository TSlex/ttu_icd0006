import { autoinject } from 'aurelia-framework';
import { AppState } from 'state/state';
import { HttpClient, json } from 'aurelia-fetch-client';
import { BaseApi } from './BaseApi';


@autoinject
export class AccountApi extends BaseApi {

  constructor(protected appState: AppState, protected httpClient: HttpClient) {
    super(appState, "identity", httpClient);
  }

  // async login(email: string, password: string): Promise<IFetchResponse<ILoginResponse>> {
  //   try {
  //     const response = await this.httpClient.post('account/login', JSON.stringify({
  //       email: email,
  //       password: password,
  //     }), {
  //       cache: 'no-store'
  //     });

  //     // happy case
  //     if (response.status >= 200 && response.status < 300) {
  //       const data = (await response.json()) as ILoginResponse;
  //       return {
  //         statusCode: response.status,
  //         data: data
  //       }
  //     }

  //     const _response = (await response.json())

  //     return {
  //       statusCode: _response.status!,
  //       errorMessage: _response.title!
  //     }
  //   }
  //   catch (reason) {
  //     return {
  //       statusCode: 0,
  //       errorMessage: JSON.stringify(reason)
  //     }
  //   }
  // }

  // async register(email: string, password: string): Promise<IFetchResponse<IRegisterResponse>> {

  //   try {
  //     const response = await this.httpClient.post('account/register', JSON.stringify({
  //       email: email,
  //       password: password,
  //     }), {
  //       cache: 'no-store'
  //     });

  //     // happy case
  //     if (response.status >= 200 && response.status < 300) {
  //       const data = (await response.json()) as IRegisterResponse;
  //       return {
  //         statusCode: response.status,
  //         data: data
  //       }
  //     }

  //     // something went wrong
  //     const _response = (await response.json())

  //     return {
  //       statusCode: _response.status!,
  //       errorMessage: (JSON.parse(_response.detail!) as string[]).join("\n"),
  //       // errorMessage: _response.detail!,
  //       errors: _response.errors
  //     }
  //   }

  //   catch (reason) {
  //     return {
  //       statusCode: 0,
  //       errorMessage: JSON.stringify(reason)
  //     }
  //   }
  // }
}
