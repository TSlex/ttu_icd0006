import { IFetchResponseDTO } from 'types/Response/IFetchResponseDTO';
import BaseApi from "./BaseApi";
import store from 'redux/store';
import { ITodoPriorityGetDTO } from 'types/ITodoPriorityDTO';

export default class TodoPrioritiesApi extends BaseApi {
    public static readonly fetchUrl = "TodoPriorities"

    private static readonly _headers = () => ({ Authorization: 'Bearer ' + store.getState().account.jwt })

    public static async Index(): Promise<IFetchResponseDTO<ITodoPriorityGetDTO[]>> {
        const url = `${this.fetchUrl}`

        return BaseApi._index<ITodoPriorityGetDTO>(url, this._headers())
    }
}