import { Router } from 'aurelia-router';
import { autoinject } from "aurelia-framework"
import { AccountService } from "servises/AccountApi";
import { AppState } from "state/state";

@autoinject
export class AccountLogin {

  private _email: string = "";
  private _password: string = "";
  private _errorMessage: string | null = null;

  constructor(private accountService: AccountService, private appState: AppState, private router: Router) {

  }

  onSubmit(event: Event) {
      // console.log(this._email, this._password);
      event.preventDefault();

      this.accountService.login(this._email, this._password).then(
          response => {
              // console.log(response);

              if (response.statusCode == 200) {

                  this.appState.jwt = response.data!.token;
                  this.router!.navigateToRoute('home');

              } else {

                  this._errorMessage = response.statusCode.toString()
                      + ' '
                      + response.errorMessage!

              }
          }
      );
  }
}
