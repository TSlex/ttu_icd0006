import { IResponseDTO } from 'types/Response/IResponseDTO';
import { IProfileEmailDTO } from "types/Identity/IProfileEmailDTO";
import { AccountApi } from "servises/AccountApi";
import { ViewBase } from "components/ViewBase";
import { AppState } from "state/state";
import { autoinject } from 'aurelia-framework';
import { IAlertData } from "types/IAlertData";
import { AlertType } from 'types/Enums/AlertType';

@autoinject
export class ManageEmail extends ViewBase {

    constructor(private accountApi: AccountApi, appState: AppState) {
        super(appState);
        this.setLocalLoaded(false);
    }

    private emailModel: IProfileEmailDTO = {
        currentEmail: "",
        newEmail: ""
    }

    async bind() {
        let email: string = (await this.accountApi.getEmail()).data

        this.emailModel = {
            currentEmail: email,
            newEmail: email
        };

        this.setLocalLoaded(true)
    }

    onSubmit() {
        if (this.emailModel) {

            this.clearNotifier()

            this.accountApi.putEmail(this.emailModel).then((response: IResponseDTO) => {
                if (response.errors) {
                    this.errors = response.errors;
                } else {
                    // this.alert = {message: "Email was updated successfully.", type: AlertType.Success, dismissable: true}
                    this.alert = {message: response.status, type: AlertType.Success, dismissable: true}
                    this.emailModel!.currentEmail = this.emailModel!.newEmail;
                }
            })
        }
    }

    unbind(){
        this.setLocalLoaded(false)
    }
}
