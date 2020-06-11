import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { BaseApi } from 'servises/BaseApi';
import { AppState } from 'state/state';
import { IImageDTO, IImagePostDTO, IImagePutDTO } from 'types/IImageDTO';
import { IResponseDTO } from 'types/Response/IResponseDTO';
import { parseResponse } from 'helpers/ResponseParser';
import { IFetchResponse } from 'types/Response/IFetchResponseDTO';

@autoinject
export class ImagesApi extends BaseApi {

    async getImageModel(id: string = ""): Promise<IFetchResponse<IImageDTO>> {
        const url = `${this.fetchUrl}/${id}/model`;

        try {
            const response = await this.httpClient.get(url, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return {
                        status: response.status.toString(),
                        errors: [],
                        data: (await response.json()) as IImageDTO
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


    async postImageModel(imageModel: IImagePostDTO): Promise<IFetchResponse<IImageDTO>> {
        const url = `${this.fetchUrl}/`;

        let formData = new FormData();

        formData.append('imageFor', imageModel.imageFor.toString())
        formData.append('imageType', imageModel.imageType.toString())
        formData.append('paddingTop', imageModel.paddingTop.toString())
        formData.append('paddingRight', imageModel.paddingRight.toString())
        formData.append('paddingBottom', imageModel.paddingBottom.toString())
        formData.append('paddingLeft', imageModel.paddingLeft.toString())
        formData.append('widthPx', imageModel.widthPx.toString())
        formData.append('heightPx', imageModel.heightPx.toString())
        formData.append('imageFile', imageModel.imageFile ? imageModel.imageFile : '')

        try {
            const response = await this.httpClient.post(url, formData, { headers: this.headers });

            switch (response.status) {
                case 200:
                case 201:
                case 204:
                    return {
                        status: response.status.toString(),
                        errors: [],
                        data: (await response.json()) as IImageDTO
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

    async putImageModel(id: string = '', imageModel: IImagePutDTO): Promise<IResponseDTO> {
        const url = `${this.fetchUrl}/${id}`;

        let formData = new FormData();

        formData.append('id', imageModel.id)
        formData.append('paddingTop', imageModel.paddingTop.toString())
        formData.append('paddingRight', imageModel.paddingRight.toString())
        formData.append('paddingBottom', imageModel.paddingBottom.toString())
        formData.append('paddingLeft', imageModel.paddingLeft.toString())
        formData.append('widthPx', imageModel.widthPx.toString())
        formData.append('heightPx', imageModel.heightPx.toString())
        formData.append('imageFile', imageModel.imageFile ? imageModel.imageFile : '')

        try {
            const response = await this.httpClient.put(url, formData, { headers: this.headers });

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

    async getImage(id: string = ''): Promise<string> {
        const url = `${this.fetchUrl}/${id}`;
        const response = await this.httpClient.get(url, { headers: this.headers });

        console.log(response)

        switch (response.status) {
            case 200:
                return this._imageEncode(await response.arrayBuffer());
            default:
                console.log(response.status + ":" + response.statusText)
                return this._imageEncode(await response.arrayBuffer());
        }
    }

    async getOriginalImage(id: string = ''): Promise<string> {

        console.log(id)

        const url = `${this.fetchUrl}/${id}/original`;
        const response = await this.httpClient.get(url, { headers: this.headers });

        switch (response.status) {
            case 200:
                return this._imageEncode(await response.arrayBuffer());
            default:
                console.log(response.status + ":" + response.statusText)
                return this._imageEncode(await response.arrayBuffer());
        }
    }

    _imageEncode(arrayBuffer: ArrayBuffer) {
        let image = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        return `data:image/jpeg;base64,${image}`
    }

    constructor(protected appState: AppState, protected httpClient: HttpClient) {
        super(appState, "images", httpClient);

        this.headers['Cache-Control'] = 'no-cache';
        this.headers['Content-Type'] = 'image/jpeg';
    }
}
