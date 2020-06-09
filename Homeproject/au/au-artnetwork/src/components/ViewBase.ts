import { autoinject, PLATFORM } from 'aurelia-framework';

@autoinject
export class ViewBase{
    protected isLoading = false;

    get bluredClass(){
        return this.isLoading ? 'blur-transition blur' : null;
    }
}
