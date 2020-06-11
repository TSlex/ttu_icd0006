import { ImagesApi } from 'servises/ImagesApi';
import { autoinject } from 'aurelia-framework';
import { AccountApi } from 'servises/AccountApi';
import { AppState } from 'state/state';
import { RenderImageViewBase } from 'components/RenderImageViewBase';
import { IProfileDTO } from 'types/IProfileDTO';
import { ImageType } from 'types/Enums/ImageType';

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
            this.imageModel = {
                id: "00000000-0000-0000-0000-000000000000",
                imageUrl: "",
                originalImageUrl: "",
                heightPx: 0,
                widthPx: 0,
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                imageFile: null,
                imageType: ImageType.ProfileAvatar,
                imageFor: ""
            };
        }
    }

    attached() {
        let exist = document.getElementById("image_miniature_script");

        if (exist) {
            // exist.remove();
        } else {
            let script = document.createElement("script");
            script.setAttribute("id", "image_miniature_script");
            script.setAttribute("src", "js/image-miniature.js");
            script.setAttribute("defer", "defer");
            document.body.appendChild(script);
        }
    }


    onSubmit() {
        if (true) {

            this.clearNotifier()

        }
    }
}
