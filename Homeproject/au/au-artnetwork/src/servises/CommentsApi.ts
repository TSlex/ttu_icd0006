import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApi } from 'servises/BaseApi';
import { AppState } from 'state/state';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { ICommentGetDTO, ICommentPutDTO, ICommentPostDTO } from 'types/ICommentDTO';
import { IResponseDTO } from 'types/Response/IResponseDTO';

@autoinject
export class CommentsApi extends BaseApi {

    constructor(protected appState: AppState, protected httpClient: HttpClient) {
        super(appState, "comments", httpClient);
    }

    async Index(postId: string): Promise<IFetchResponse<ICommentGetDTO[]>> {
        const url = `${this.fetchUrl}/${postId}/1`;

        return await this._index<ICommentGetDTO>(url, { headers: this.headers })
    }

    async Details(id: string): Promise<IFetchResponse<ICommentGetDTO>> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._details<ICommentGetDTO>(url, { headers: this.headers })
    }

    async Create(model: ICommentPostDTO): Promise<IFetchResponse<ICommentGetDTO>> {
        const url = `${this.fetchUrl}`;

        return await this._createAndReturn(url, model, { headers: this.headers })
    }

    async Edit(id: string, model: ICommentPutDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._edit(url, model, { headers: this.headers })
    }

    async Delete(id: string): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._delete(url, { headers: this.headers })
    }
}
