import { autoinject, bindable } from 'aurelia-framework';
import { ImagesApi } from 'servises/ImagesApi';

@autoinject
export class ImageComponent {

    constructor(private imagesApi: ImagesApi) {
    }

    @bindable public id!: string;
    @bindable public htmlHeight!: string;
    @bindable public htmlWidth!: string;
    @bindable public htmlClass!: string | null;
    @bindable public htmlId!: string | null;
    @bindable public original!: boolean;

    get Id() {
        return this.id ?? null;
    }

    get Height(): string {
        return this.htmlHeight ?? "150px";
    }

    get Width(): string {
        return this.htmlWidth ?? "150px";
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

    get Style() {
        let styles: string[] = []

        if (!isNaN(Number(this.Width))){
            styles.push(`width: ${this.Width};`)
        }

        if (!isNaN(Number(this.Height))){
            styles.push(`height: ${this.Height};`)
        }

        return styles.join("; ")
    }

    private src: string = "";

    attached() {
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
