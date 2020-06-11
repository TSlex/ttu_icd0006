import { autoinject, PLATFORM } from 'aurelia-framework';
import { AppState } from 'state/state';
import { IAlertData } from 'types/IAlertData';
import * as $ from "jquery";

@autoinject
export class ViewBase{

    private _isLoaded: boolean = true;
    private _isLoading: boolean = true;

    protected alert: IAlertData | null = null;
    protected errors: string[] = [];

    clearNotifier(){
        this.errors = [];
        this.alert = null;

        document.querySelectorAll('alert').forEach((element: HTMLElement) => {element.remove()})
    }

    get isLoading(){
        return this.appState.isComponentLoading;
    }

    set isLoading(value: boolean){
        this.appState.isComponentLoading = value;
        this._isLoading = value;
    }

    get isLocalLoading(){
        return this._isLoading;
    }

    set isLocalLoading(value: boolean){
        this._isLoading = value;
    }

    get isLoaded(){
        return this._isLoaded;
    }

    set isLoaded(value: boolean){
        this._isLoaded = value;
    }

    get bluredClass(){
        return this.isLoading ? 'blur-transition blur' : null;
    }

    constructor(protected appState: AppState){}
}
