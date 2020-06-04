import { Router } from 'aurelia-router';
import { autoinject } from "aurelia-framework"
import { AppState } from "state/state";
import { AccountApi } from 'servises/AccountApi';

@autoinject
export class AccountRegister {

  private _email: string = "";
  private _password: string = "";
  private _confirmPassword: string = "";
  private _errorMessage: string | null = null;
  private _errors: { [propertyName: string]: string[] } | null = null

  constructor(private accountApi: AccountApi, private appState: AppState, private router: Router) {

  }

  onSubmit(event: Event) {
    // console.log(this._email, this._password);
    event.preventDefault();

    // if (this._password != this._confirmPassword) {
    //   this._errors = { "Password": ["Passwords should match!"] }
    //   return
    // }

    // this.accountApi.register(this._email, this._password).then(
    //   response => {
    //     console.log(response);

    //     if (response.statusCode == 200) {

    //       this.router!.navigateToRoute('account-login');

    //     } else {

    //       this._errorMessage = response.statusCode.toString()
    //         + ' '
    //         + response.errorMessage!

    //       this._errors = response.errors!
    //     }
    //   }
    // );
  }
}
