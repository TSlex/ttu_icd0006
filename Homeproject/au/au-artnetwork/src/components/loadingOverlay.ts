import { autoinject, bindable } from 'aurelia-framework';

@autoinject
export class LoadingOverlay {

    constructor(){
    }

    @bindable public fixed: boolean = true;

    get IsFixed(){
        return this.fixed === true;
    }
}
