import { IResponseDTO } from './../types/Response/IResponseDTO';
import { IMessagePostDTO, IMessagePutDTO } from './../types/IMessageDTO';
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

        return await this._index<IMessageGetDTO>(url, { headers: this.headers })
    }

    async Details(id: string): Promise<IFetchResponse<IMessageGetDTO>> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._details<IMessageGetDTO>(url, { headers: this.headers })
    }

    async Create(model: IMessagePostDTO): Promise<IFetchResponse<IMessageGetDTO>> {
        const url = `${this.fetchUrl}`;

        return await this._createAndReturn(url, model, { headers: this.headers })
    }

    async Edit(id: string, model: IMessagePutDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._edit(url, model, { headers: this.headers })
    }

    async Delete(id: string): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        return await this._delete(url, { headers: this.headers })
    }
}
