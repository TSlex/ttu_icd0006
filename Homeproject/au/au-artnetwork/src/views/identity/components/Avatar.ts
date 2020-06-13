import { IFetchResponse } from './../../../types/Response/IFetchResponseDTO';
import { ImagesApi } from 'servises/ImagesApi';
import { autoinject } from 'aurelia-framework';
import { AccountApi } from 'servises/AccountApi';
import { AppState } from 'state/state';
import { RenderImageViewBase } from 'components/RenderImageViewBase';
import { IProfileDTO } from 'types/IProfileDTO';
import { ImageType } from 'types/Enums/ImageType';
import { IImagePostDTO, IImageDTO, IImagePutDTO } from 'types/IImageDTO';

@autoinject
export class ManageAvatar extends RenderImageViewBase {

    constructor(
        private accountApi: AccountApi,
        private imagesApi: ImagesApi,
        appState: AppState
    ) {
        super(appState);
    }

    private profile: IProfileDTO | null = null

    get isAvatarExist() {
        return this.profile?.profileAvatarId != null;
    }

    async created() {
        this.profile = (await this.accountApi.getProfile(this.appState.userName)).data;

        if (this.isAvatarExist) {
            this.imageModel = (await this.imagesApi.getImageModel(this.profile!.profileAvatarId)).data
        } else {
            this.imageModel = this.getNewImageModel(ImageType.ProfileAvatar)
        }

        this.loadScript()
    }

    onSubmit() {
        if (this.imageModel) {
            this.clearNotifier()

            if (!this.isAvatarExist) {
                let postModel = this.imagePostModel;

                this.imagesApi.postImageModel(postModel).then(
                    (response: IFetchResponse<IImageDTO>) => {
                        console.log(response);
                    }
                );

            } else if (this.isAvatarExist) {
                let putModel = this.imagePutModel;

                this.imagesApi.putImageModel(this.imageModel.id, putModel).then(
                    (response: IFetchResponse<IImageDTO>) => {
                        console.log(response);
                    }
                );
            }
        }
    }
}
