import BaseApi from "./BaseApi";
import { ILoginDTO } from "types/Response/Identity/ILoginDTO";
import { IRegisterDTO } from "types/Response/Identity/IRegisterDTO";

export default class AccountApi extends BaseApi {
    fetchUrl = "account/"

    public static async Login(loginModel: ILoginDTO){
        const url = "login"
        const response = await this.axios.post(url, loginModel);

        return BaseApi.handleFetchResponse<string>(response)
    }

    public static async Register(registerModel: IRegisterDTO){
        const url = "register"
        const response = await this.axios.post(url, registerModel);

        return BaseApi.handleFetchResponse<string>(response)
    }
}