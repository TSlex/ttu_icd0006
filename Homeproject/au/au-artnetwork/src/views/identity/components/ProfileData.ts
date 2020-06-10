import { autoinject } from 'aurelia-framework';
import { ViewBase } from 'components/ViewBase';
import { AccountApi } from 'servises/AccountApi';
import { AppState } from 'state/state';

@autoinject
export class ManageProfileData extends ViewBase{
    
    constructor(private accountApi: AccountApi, appState: AppState) {
        super(appState);
    }
}
