import { autoinject } from 'aurelia-framework';
import { AppState } from 'state/state';
import { HttpClient, json } from 'aurelia-fetch-client';
import { BaseApi } from './BaseApi';

import { parseResponse } from 'helpers/ResponseParser';

import { IFetchResponse } from 'types/Response/IFetchResponseDTO';
import { IJwtResponseDTO } from 'types/Response/IJwtResponseDTO';
import { IRegisterDTO } from 'types/Identity/IRegisterDTO';
import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { IProfileEmailDTO } from 'types/Identity/IProfileEmailDTO';
import { IResponseDTO } from 'types/Response/IResponseDTO';
import { IProfileDataDTO } from 'types/Identity/IProfileDataDTO';
import { IProfilePasswordDTO } from 'types/Identity/IProfilePasswordDTO';


@autoinject
export class AccountApi extends BaseApi {

    constructor(protected appState: AppState, protected httpClient: HttpClient) {
        super(appState, "identity", httpClient);
    }

    async login(loginModel: ILoginDTO): Promise<IJwtResponseDTO> {
        const url = `${this.fetchUrl}/login`;

        try {
            const response = await this.httpClient.post(url, JSON.stringify(loginModel))

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return (await response.json()) as IJwtResponseDTO
                default:
                    return (await response.json()) as IJwtResponseDTO
            }
        } catch (reason) {
            return {
                errors: ["Authorisation fails"]
            } as IJwtResponseDTO
        }
    }

    async register(registerModel: IRegisterDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/register`;

        try {
            const response = await this.httpClient.post(url, JSON.stringify(registerModel))

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return (await response.json()) as IResponseDTO
                default:
                    return (await response.json()) as IResponseDTO
            }
        } catch (reason) {
            return {
                errors: ["Authorisation fails"]
            } as IResponseDTO
        }
    }

    async getEmail(): Promise<IFetchResponse<string>> {
        const url = `${this.fetchUrl}/getemail`

        try {
            const response = await this.httpClient.get(url, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return {
                        status: response.status.toString(),
                        errors: [],
                        data: (await response.json()) as string
                    }
                default:
                    return {
                        status: response.status.toString(),
                        errors: [(await response.json()).errors],
                        data: null
                    }
            }
        } catch (reason) {
            return {
                status: "-1",
                errors: [reason],
                data: null
            }
        }
    }

    async putEmail(emailModel: IProfileEmailDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/updateprofileemail`

        try {
            const response = await this.httpClient.put(url, emailModel, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return parseResponse(response)
                default:
                    return parseResponse(response)
            }
        } catch (reason) {
            return {
                status: "-1",
                errors: [reason],
            }
        }
    }

    async getProfileData(jwt: string | null): Promise<IFetchResponse<IProfileDataDTO>> {
        const url = `${this.fetchUrl}/getprofiledata`

        try {
            const response = await this.httpClient.get(url, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return {
                        status: response.status.toString(),
                        errors: [],
                        data: (await response.json()) as IProfileDataDTO
                    }
                default:
                    return {
                        status: response.status.toString(),
                        errors: [(await response.json()).errors],
                        data: null
                    }
            }
        } catch (reason) {
            return {
                status: "-1",
                errors: [reason],
                data: null
            }
        }
    }

    async putProfileData(dataModel: IProfileDataDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/updateprofiledata`

        try {
            const response = await this.httpClient.put(url, dataModel, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return parseResponse(response)
                default:
                    return parseResponse(response)
            }
        } catch (reason) {
            return {
                status: "-1",
                errors: [reason],
            }
        }
    }

    async putPassword(passwordModel: IProfilePasswordDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/updateprofilepassword`

        try {
            const response = await this.httpClient.put(url, passwordModel, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return parseResponse(response)
                default:
                    return parseResponse(response)
            }
        } catch (reason) {
            return {
                status: "-1",
                errors: [reason],
            }
        }
    }
}
