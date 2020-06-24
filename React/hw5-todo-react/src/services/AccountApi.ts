import { IFetchResponseDTO } from './../types/Response/IFetchResponseDTO';
import { IJwtResponseDTO } from 'types/Response/IJwtResponseDTO';

import BaseApi from "./BaseApi";

import { ILoginDTO } from "types/Identity/ILoginDTO";
import { IRegisterDTO } from "types/Identity/IRegisterDTO";

import store from 'redux/store';

export default class AccountApi extends BaseApi {
    public static readonly fetchUrl = "account"

    private static readonly _headers = () => ({ Authorization: 'Bearer ' + store.getState().account.jwt })

    public static async Login(loginModel: ILoginDTO): Promise<IFetchResponseDTO<IJwtResponseDTO>> {
        const url = `${this.fetchUrl}/login`
        const response = await this.axios.post(url, loginModel, { headers: this._headers() });

        return BaseApi.handleFetchResponse<IJwtResponseDTO>(response)
    }

    public static async Register(registerModel: IRegisterDTO): Promise<IFetchResponseDTO<string>> {
        const url = `${this.fetchUrl}/register`
        const response = await this.axios.post(url, registerModel);

        return BaseApi.handleFetchResponse<string>(response)
    }
}