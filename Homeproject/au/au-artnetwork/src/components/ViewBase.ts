import { autoinject, PLATFORM } from 'aurelia-framework';
import { AppState } from 'state/state';

@autoinject
export class ViewBase{

    get isLoading(){
        return this.appState.isComponentLoading;
    }

    set isLoading(value: boolean){
        this.appState.isComponentLoading = value;
    }

    get bluredClass(){
        return this.isLoading ? 'blur-transition blur' : null;
    }

    constructor(protected appState: AppState){}
}
