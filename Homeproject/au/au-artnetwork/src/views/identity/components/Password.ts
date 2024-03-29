import { autoinject } from 'aurelia-framework';
import { IProfilePasswordDTO } from 'types/Identity/IProfilePasswordDTO';
import { ViewBase } from 'components/ViewBase';
import { AccountApi } from 'servises/AccountApi';
import { AppState } from 'state/state';
import { IResponseDTO } from 'types/Response/IResponseDTO';
import { AlertType } from 'types/Enums/AlertType';

@autoinject
export class ManagePassword extends ViewBase {

    constructor(private accountApi: AccountApi, appState: AppState) {
        super(appState);
        this.setLocalLoaded(false);
    }

    private passwordModel: IProfilePasswordDTO = {
        currentPassword: "",
        newPassword: ""
    };

    private passwordConfirmation: string = "";

    bind(){
        this.setLocalLoaded(true)
    }

    onSubmit() {
        if (
            this.passwordModel.currentPassword.length <= 0 ||
            this.passwordModel.newPassword.length <= 0
        ) {
            this.errors.push("All fields is required!");

        } else if (this.passwordModel.newPassword !== this.passwordConfirmation) {
            this.errors.push("Passwords have to match!");

        } else {
            this.clearNotifier()

            this.accountApi.putPassword(this.passwordModel).then((response: IResponseDTO) => {
                if (response.errors) {
                    this.errors = response.errors;
                } else {
                    // this.alert = { message: "Password was changed successfully.", type: AlertType.Success, dismissable: true }
                    this.alert = {message: response.status, type: AlertType.Success, dismissable: true}
                    this.passwordModel.currentPassword = "";
                    this.passwordModel.newPassword = "";
                    this.passwordConfirmation = "";
                }
            })
        }
    }

    unbind(){
        this.setLocalLoaded(false)
    }
}
