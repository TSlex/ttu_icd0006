import Axios, { AxiosResponse } from 'axios';
import { IFetchResponseDTO } from '../types/Response/IFetchResponseDTO';

export default class BaseApi {

    protected static headers = {
        common: {
            'Content-Type': 'application/json'
        },
        Authorization: 'Bearer ',
    }

    protected static readonly baseApiUrl: string = "https://taltech.akaver.com/api/"
    protected static fetchUrl: string = ""

    protected static axios = Axios.create(
        {
            validateStatus: () => true,
            baseURL: BaseApi.baseApiUrl,
            headers: () => BaseApi.headers
        }
    )

    protected static handleFetchResponse<TData>(response: AxiosResponse): IFetchResponseDTO<TData> {
        switch (response.status) {
            case 200:
            case 201:
            case 204:
                return {
                    status: response.status.toString(),
                    errors: [],
                    data: response.data
                }

            default:
                return {
                    status: response.status.toString(),
                    errors: [response.data.errors],
                    data: null
                }
        }
    }

    protected static handleFetchError(errors: string[]) {
        return {
            status: "999",
            errors: [errors],
            data: null
        }
    }

    // protected static async _index<TData>(url: string): Promise<IFetchResponseDTO<TData[]>> {

    // }
    // protected static async _details<TData>(url: string): Promise<IFetchResponseDTO<TData>> {

    // }
    // protected static async _create<TData>(url: string): Promise<IFetchResponseDTO<TData>> {

    // }
    // protected static async _edit<TData>(url: string): Promise<IFetchResponseDTO<TData>> {

    // }
    // protected static async _delete<TData>(url: string): Promise<IFetchResponseDTO<TData>> {

    // }
}