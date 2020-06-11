import { autoinject, PLATFORM } from 'aurelia-framework';
import { AppState } from 'state/state';
import { IAlertData } from 'types/IAlertData';
import { ViewBase } from './ViewBase';
import { IImageDTO } from 'types/IImageDTO';

@autoinject
export class RenderImageViewBase extends ViewBase {

    constructor(appState: AppState) {
        super(appState);
    }

    protected imageModel: IImageDTO | null = null;

    loadFile(event: Event) {
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
}
