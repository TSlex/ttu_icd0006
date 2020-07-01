import BaseApi from "./BaseApi"
import store from "redux/store"
import { IFetchResponseDTO } from "types/Response/IFetchResponseDTO"
import { ITodoTaskGetDTO, ITodoTaskPostDTO, ITodoTaskPutDTO } from "types/ITodoTaskDTO"

export default class TodoTasksApi extends BaseApi {
    public static readonly fetchUrl = "TodoTasks"

    private static readonly _headers = () => ({ Authorization: 'Bearer ' + store.getState().account.jwt })

    public static async Index(): Promise<IFetchResponseDTO<ITodoTaskGetDTO[]>> {
        const url = `${this.fetchUrl}`

        return BaseApi._index<ITodoTaskGetDTO>(url, this._headers())
    }

    public static async Details(): Promise<IFetchResponseDTO<ITodoTaskGetDTO>> {
        const url = `${this.fetchUrl}`

        return BaseApi._details<ITodoTaskGetDTO>(url, this._headers())
    }

    public static async Create(createModel: ITodoTaskPostDTO): Promise<IFetchResponseDTO<ITodoTaskGetDTO>> {
        const url = `${this.fetchUrl}`

        return BaseApi._create<ITodoTaskGetDTO>(url, createModel, this._headers())
    }

    public static async Edit(editModel: ITodoTaskPutDTO): Promise<IFetchResponseDTO<ITodoTaskGetDTO>> {
        const url = `${this.fetchUrl}/${editModel.id}`

        return BaseApi._edit<ITodoTaskGetDTO>(url, editModel, this._headers())
    }

    public static async Delete(id: string): Promise<IFetchResponseDTO<ITodoTaskGetDTO>> {
        const url = `${this.fetchUrl}/${id}`

        return BaseApi._delete<ITodoTaskGetDTO>(url, this._headers())
    }
}