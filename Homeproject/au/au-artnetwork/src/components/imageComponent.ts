import { autoinject, bindable } from 'aurelia-framework';
import { ImagesApi } from 'servises/ImagesApi';

@autoinject
export class ImageComponent {

    constructor(private imagesApi: ImagesApi) {
    }

    @bindable public id!: string;
    @bindable public height!: string;
    @bindable public width!: string;
    @bindable public htmlClass!: string | null;
    @bindable public htmlId!: string | null;
    @bindable public original!: boolean;

    get Id() {
        return this.id ?? "12422331-eaf3-46f4-9649-b6beaa2dbb9b";
    }

    get Height(): string {
        return this.height ?? "150px";
    }

    get Width(): string {
        return this.width ?? "150px ";
    }

    get HtmlClass(): string {
        return this.htmlClass ?? null;
    }

    get HtmlId(): string {
        return this.htmlId ?? null;
    }

    get IsOriginal(): boolean {
        return this.original ?? false;
    }

    get Style(){
        return `width: ${this.Width}; height: ${this.Height}`
    }

    private src: string = "";

    created() {
        if (!this.IsOriginal) {
            this.imagesApi.getImage(this.Id).then(imageData => {
                this.src = imageData;
            });
        } else {
            this.imagesApi.getOriginalImage(this.Id).then(imageData => {
                this.src = imageData;
            });
        }
    }
}
