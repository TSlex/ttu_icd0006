import { IFetchResponseDTO } from 'types/Response/IFetchResponseDTO';
import BaseApi from "./BaseApi";
import store from 'redux/store';
import { ITodoPriorityGetDTO, ITodoPriorityPostDTO, ITodoPriorityPutDTO } from 'types/ITodoPriorityDTO';

export default class TodoPrioritiesApi extends BaseApi {
    public static readonly fetchUrl = "TodoPriorities"

    private static readonly _headers = () => ({ Authorization: 'Bearer ' + store.getState().account.jwt })

    public static async Index(): Promise<IFetchResponseDTO<ITodoPriorityGetDTO[]>> {
        const url = `${this.fetchUrl}`

        return BaseApi._index<ITodoPriorityGetDTO>(url, this._headers())
    }

    public static async Details(): Promise<IFetchResponseDTO<ITodoPriorityGetDTO>> {
        const url = `${this.fetchUrl}`

        return BaseApi._details<ITodoPriorityGetDTO>(url, this._headers())
    }

    public static async Create(createModel: ITodoPriorityPostDTO): Promise<IFetchResponseDTO<ITodoPriorityGetDTO>> {
        const url = `${this.fetchUrl}`

        return BaseApi._create<ITodoPriorityGetDTO>(url, createModel, this._headers())
    }

    public static async Edit(editModel: ITodoPriorityPutDTO): Promise<IFetchResponseDTO<ITodoPriorityGetDTO>> {
        const url = `${this.fetchUrl}/${editModel.id}`

        return BaseApi._edit<ITodoPriorityGetDTO>(url, editModel, this._headers())
    }

    public static async Delete(id: string): Promise<IFetchResponseDTO<ITodoPriorityGetDTO>> {
        const url = `${this.fetchUrl}/${id}`

        return BaseApi._delete<ITodoPriorityGetDTO>(url, this._headers())
    }
}