import { autoinject } from 'aurelia-framework';
import { AppState } from 'state/state';
import { AccountApi } from 'servises/AccountApi';

@autoinject
export class HomeIndex{

    private token: string = "";
    private isAdmin: boolean = false;
    private username: string = "";
    private id: string = "";
    private imageId: string = "";

    constructor(private appState: AppState, private accountApi: AccountApi) {
        this.appState.isComponentLoading = false;

        if (this.appState.profileImageId){
            this.imageId = this.appState.profileImageId
        }
    }

    async bind() {
        this.imageId = (await this.accountApi.getProfile(this.appState.userName)).data.profileAvatarId;
        this.appState.profileImageId = this.imageId;
    }

    attached() {
      this.token = this.appState.jwt;
      this.isAdmin = this.appState.isAdmin;
      this.username = this.appState.userName;
      this.id = this.appState.userId;
    }
}
