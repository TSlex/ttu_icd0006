import { autoinject, bindable } from 'aurelia-framework';
import { ImagesApi } from 'servises/ImagesApi';
import { AppState } from 'state/state';

@autoinject
export class ImageComponent {

    constructor(private appState: AppState, private imagesApi: ImagesApi) {
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

        if (!isNaN(Number(this.Width))) {
            styles.push(`width: ${this.Width};`)
        }

        if (!isNaN(Number(this.Height))) {
            styles.push(`height: ${this.Height};`)
        }

        return styles.join("; ")
    }

    get LoadingStyle() {
        let base = "position: relative; margin: auto; border-radius: 4px; overflow: hidden;"

        if (isNaN(Number(this.Width))) {
            base = base + " width: 100px;";
        } else {
            base = base + ` width: ${this.Width};`;
        }

        if (isNaN(Number(this.Height))) {
            base = base + " height: 100px;";
        } else {
            base = base + ` height: ${this.Height};`;
        }

        return base;
    }

    private src: string = "";
    private imageLoaded: boolean = false;

    attached() {
        if (!this.IsOriginal) {
            if (this.appState.imagesData[this.Id]) {
                this.src = this.appState.imagesData[this.Id];
                this.imageLoaded = true;
            }
            this.imagesApi.getImage(this.Id).then(imageData => {
                this.src = imageData;
                this.appState.imagesData[this.Id] = imageData;
                this.imageLoaded = true;
            });
        } else {
            if (this.appState.imagesData[this.Id + "original"]) {
                this.src = this.appState.imagesData[this.Id + "original"];
                this.imageLoaded = true;
            }
            this.imagesApi.getOriginalImage(this.Id).then(imageData => {
                this.src = imageData;
                this.appState.imagesData[this.Id + "original"] = imageData;
                this.imageLoaded = true;
            });
        }
    }
}
