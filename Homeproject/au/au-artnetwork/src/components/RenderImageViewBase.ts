import { autoinject, PLATFORM } from 'aurelia-framework';
import { AppState } from 'state/state';
import { IAlertData } from 'types/IAlertData';
import { ViewBase } from './ViewBase';
import { IImageDTO, IImagePostDTO, IImagePutDTO } from 'types/IImageDTO';
import * as $ from "jquery";
import { ImageType } from 'types/Enums/ImageType';

@autoinject
export class RenderImageViewBase extends ViewBase {

    constructor(appState: AppState) {
        super(appState);
    }

    protected imageModel: IImageDTO | null = null;

    get fileName() {
        return this.imageModel?.imageFile?.name;
    }

    get imagePostModel(): IImagePostDTO {
        return {
            heightPx: this.imageModel.heightPx,
            widthPx: this.imageModel.widthPx,
            paddingTop: this.imageModel.paddingTop,
            paddingRight: this.imageModel.paddingRight,
            paddingBottom: this.imageModel.paddingBottom,
            paddingLeft: this.imageModel.paddingLeft,
            imageFile: this.imageModel.imageFile,
            imageType: ImageType.ProfileAvatar,
            imageFor: ""
        };
    }

    get imagePutModel(): IImagePutDTO {
        return {
            id: this.imageModel.id,
            heightPx: this.imageModel.heightPx,
            widthPx: this.imageModel.widthPx,
            paddingTop: this.imageModel.paddingTop,
            paddingRight: this.imageModel.paddingRight,
            paddingBottom: this.imageModel.paddingBottom,
            paddingLeft: this.imageModel.paddingLeft,
            imageFile: this.imageModel.imageFile
        };
    }

    getNewImageModel(imageType: ImageType): IImageDTO {
        return {
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
            imageType: imageType,
            imageFor: ""
        };
    }

    loadFile() {
        this.imageModel!.imageFile = (event.target as HTMLInputElement)?.files![0];

        if (this.imageModel && this.imageModel.imageFile) {
            let reader = new FileReader();

            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target!.result as string;

                image.onload = function () {
                    console.log("image");

                    let height = $("#HeightPx");
                    let width = $("#WidthPx");
                    height.attr("value", image.height);
                    width.attr("value", image.width);

                    height.get()[0].dispatchEvent(new Event('change'))
                    width.get()[0].dispatchEvent(new Event('change'))
                };

                $("#render_image").attr("src", image.src);
                $("#image-miniature").css("visibility", "visible");
            };

            reader.readAsDataURL(this.imageModel.imageFile);
        }
    }

    loadScript() {
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
}
