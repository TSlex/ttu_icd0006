import { IFetchResponse } from './../../../types/Response/IFetchResponseDTO';
import { autoinject } from 'aurelia-framework';
import { ViewBase } from 'components/ViewBase';
import { AccountApi } from 'servises/AccountApi';
import { AppState } from 'state/state';
import { IProfileDataDTO } from 'types/Identity/IProfileDataDTO';
import { IResponseDTO } from 'types/Response/IResponseDTO';
import { AlertType } from 'types/Enums/AlertType';
import { ProfileGender } from 'types/Enums/ProfileGender';

@autoinject
export class ManageProfileData extends ViewBase {

    constructor(private accountApi: AccountApi, appState: AppState) {
        super(appState);
    }

    private profileDataModel: IProfileDataDTO | null = null;

    get isGenderOwn(): boolean {
        return this.profileDataModel?.profileGender === ProfileGender.Own ?? false;
    }

    get ProfileGenderKeys() {
        let keys = Object.keys(ProfileGender).filter((key: keyof typeof ProfileGender) => { return isNaN(Number(key)) });

        return keys
    }

    get ProfileGenders(): typeof ProfileGender {
        return ProfileGender;
    }

    async created() {
        this.accountApi.getProfileData().then(
            (response: IFetchResponse<IProfileDataDTO>) => {
                this.profileDataModel = response.data;
            }
        );
    }

    onSubmit() {
        if (this.profileDataModel) {

            this.clearNotifier();

            this.accountApi.putProfileData(this.profileDataModel).then(
                (response: IResponseDTO) => {
                    if (response.errors) {
                        this.errors = response.errors;
                    } else {
                        this.alert = { message: response.status, type: AlertType.Success, dismissable: true }
                    }
                }
            );
        }
    }
}
