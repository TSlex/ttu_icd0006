import store from "redux/store"
import { IFetchResponseDTO } from "types/Response/IFetchResponseDTO"
import { ITodoCategoryGetDTO, ITodoCategoryPostDTO, ITodoCategoryPutDTO } from "types/ITodoCategoryDTO"
import BaseApi from "./BaseApi"

export default class TodoCategoriesApi extends BaseApi {
    public static readonly fetchUrl = "TodoCategories"

    private static readonly _headers = () => ({ Authorization: 'Bearer ' + store.getState().account.jwt })

    public static async Index(): Promise<IFetchResponseDTO<ITodoCategoryGetDTO[]>> {
        const url = `${this.fetchUrl}`

        return BaseApi._index<ITodoCategoryGetDTO>(url, this._headers())
    }

    public static async Details(): Promise<IFetchResponseDTO<ITodoCategoryGetDTO>> {
        const url = `${this.fetchUrl}`

        return BaseApi._details<ITodoCategoryGetDTO>(url, this._headers())
    }

    public static async Create(createModel: ITodoCategoryPostDTO): Promise<IFetchResponseDTO<ITodoCategoryGetDTO>> {
        const url = `${this.fetchUrl}`

        return BaseApi._create<ITodoCategoryGetDTO>(url, createModel, this._headers())
    }

    public static async Edit(editModel: ITodoCategoryPutDTO): Promise<IFetchResponseDTO<ITodoCategoryGetDTO>> {
        const url = `${this.fetchUrl}/${editModel.id}`

        return BaseApi._edit<ITodoCategoryGetDTO>(url, editModel, this._headers())
    }

    public static async Delete(id: string): Promise<IFetchResponseDTO<ITodoCategoryGetDTO>> {
        const url = `${this.fetchUrl}/${id}`

        return BaseApi._delete<ITodoCategoryGetDTO>(url, this._headers())
    }
}