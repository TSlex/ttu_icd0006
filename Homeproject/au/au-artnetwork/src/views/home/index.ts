import { autoinject } from 'aurelia-framework';
import { AppState } from 'state/state';

@autoinject
export class HomeIndex{

    private token: string = "";
    private isAdmin: boolean = false;
    private username: string = "";
    private id: string = "";

    constructor(private appState: AppState) {
    }

    attached() {
      this.token = this.appState.jwt;
      this.isAdmin = this.appState.isAdmin;
      this.username = this.appState.userName;
      this.id = this.appState.userId;
    }
}
