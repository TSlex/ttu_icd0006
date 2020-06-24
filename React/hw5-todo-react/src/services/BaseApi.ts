import Axios, { AxiosResponse } from 'axios';
import { IFetchResponseDTO } from '../types/Response/IFetchResponseDTO';
import { parseErrors } from 'helpers/responseParser';

export default class BaseApi {

    protected static readonly headers = {
        common: {
            'Content-Type': 'application/json'
        },
    }

    protected static readonly baseApiUrl: string = "https://taltech.akaver.com/api/"

    protected static axios = Axios.create(
        {
            validateStatus: () => true,
            baseURL: BaseApi.baseApiUrl,
            headers: BaseApi.headers
        }
    )

    protected static async handleFetchResponse<TData>(response: AxiosResponse): Promise<IFetchResponseDTO<TData>> {
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
                    errors: await parseErrors([response.data.errors]),
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

    protected static async _index<TData>(url: string, headers: {}): Promise<IFetchResponseDTO<TData[]>> {
        const response = await this.axios.get(url, { headers: headers });

        return BaseApi.handleFetchResponse<TData[]>(response)
    }

    protected static async _details<TData>(url: string, headers: {}): Promise<IFetchResponseDTO<TData>> {
        const response = await this.axios.get(url, { headers: headers });

        return BaseApi.handleFetchResponse<TData>(response)
    }

    protected static async _create<TData>(url: string, data: {}, headers: {}): Promise<IFetchResponseDTO<TData>> {
        const response = await this.axios.post(url, data, { headers: headers });

        return BaseApi.handleFetchResponse<TData>(response)
    }

    protected static async _edit<TData>(url: string, data: {}, headers: {}): Promise<IFetchResponseDTO<TData>> {
        const response = await this.axios.put(url, data, { headers: headers });

        return BaseApi.handleFetchResponse<TData>(response)
    }

    protected static async _delete<TData>(url: string, headers: {}): Promise<IFetchResponseDTO<TData>> {
        const response = await this.axios.delete(url, { headers: headers });

        return BaseApi.handleFetchResponse<TData>(response)
    }
}