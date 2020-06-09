import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AppState } from 'state/state';
import { BaseApi } from './BaseApi';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { IPostGetDTO, IPostPostDTO, IPostPutDTO } from 'types/IPostDTO';
import { IResponseDTO } from 'types/Response/IResponseDTO';

@autoinject
export class PostsApi extends BaseApi {

    constructor(protected appState: AppState, protected httpClient: HttpClient) {
        super(appState, "posts", httpClient);
    }

    async Index(): Promise<IFetchResponse<IPostGetDTO[]>> {
        const url = `${this.appState.baseUrl}/feed/`;

        return await this._index<IPostGetDTO>(url, { headers: this.headers })
    }

    async Details(id: string): Promise<IFetchResponse<IPostGetDTO>> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._details<IPostGetDTO>(url, { headers: this.headers })
    }

    async Create(model: IPostPostDTO): Promise<IFetchResponse<IPostGetDTO>> {
        const url = `${this.fetchUrl}`;

        return await this._createAndReturn(url, model, { headers: this.headers })
    }

    async Edit(id: string, model: IPostPutDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._edit(url, model, { headers: this.headers })
    }

    async Delete(id: string): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._delete(url, { headers: this.headers })
    }
}
