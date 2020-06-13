import { ImageFormComponent } from 'components/ImageFormComponent';
import { IFetchResponse } from './../../../types/Response/IFetchResponseDTO';
import { ImagesApi } from 'servises/ImagesApi';
import { autoinject } from 'aurelia-framework';
import { AccountApi } from 'servises/AccountApi';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { AppState } from 'state/state';
import { IProfileDTO } from 'types/IProfileDTO';
import { Router } from 'aurelia-router';
import { ImageType } from 'types/Enums/ImageType';
import { IImageDTO } from 'types/IImageDTO';
import { AlertType } from 'types/Enums/AlertType';

@autoinject
export class ManageAvatar extends ImageFormComponent {

    constructor(
        private accountApi: AccountApi,
        private imagesApi: ImagesApi,
        router: Router,
        eventAggregator: EventAggregator,
        appState: AppState
    ) {
        super(eventAggregator, router, appState);
    }

    private profile: IProfileDTO | null = null

    get isAvatarExist() {
        return this.profile?.profileAvatarId != null;
    }

    async bind() {
        this.profile = (await this.accountApi.getProfile(this.appState.userName)).data;

        if (this.isAvatarExist) {
            this.imageModel = (await this.imagesApi.getImageModel(this.profile!.profileAvatarId)).data
        } else {
            this.imageModel = this.getNewImageModel(ImageType.ProfileAvatar)
        }

        this.loadScript()
        this.setLocalLoaded(true);
    }
    
    onSubmit() {
        if (this.imageModel) {
            this.clearNotifier()
            this.lockBottons();

            if (!this.isAvatarExist) {
                let postModel = this.imagePostModel;

                this.imagesApi.postImageModel(postModel).then(
                    (response: IFetchResponse<IImageDTO>) => {
                        if (!(response.errors?.length > 0)) {
                            this.alert = { message: "Avatar was updated successfully.", type: AlertType.Success, dismissable: true }
                        }
                        else {
                            this.errors = response.errors;
                        }
                        this.unlockBottons();
                    }
                );

            } else if (this.isAvatarExist) {
                let putModel = this.imagePutModel;

                this.imagesApi.putImageModel(this.imageModel.id, putModel).then(
                    (response: IFetchResponse<IImageDTO>) => {
                        if (!(response.errors?.length > 0)) {
                            this.alert = { message: "Avatar was updated successfully.", type: AlertType.Success, dismissable: true }
                        }
                        else {
                            this.errors = response.errors;
                        }
                        this.unlockBottons();
                    }
                );
            }
        }
    }

    onCancel() {
    }

    unbind(){
        this.setLocalLoaded(false)
    }
}
