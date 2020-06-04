import { IResponseDTO } from './../../types/Response/IResponseDTO';
import { Router } from 'aurelia-router';
import { autoinject } from "aurelia-framework"
import { AppState } from "state/state";
import { AccountApi } from 'servises/AccountApi';
import { IRegisterDTO } from 'types/Identity/IRegisterDTO';

@autoinject
export class AccountRegister {
  private passwordConfirmation = "";

  private model: IRegisterDTO = {
    username: "",
    email: "",
    password: ""
  };

  private errors: string[] = [];

  constructor(private accountApi: AccountApi, private appState: AppState, private router: Router) {
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.errors = [];

    if (this.model.password !== this.passwordConfirmation){
      this.errors = ["Passwords must match!"]
      return
    }

    if (
      this.model.username.length > 0 &&
      this.model.email.length > 0 &&
      this.model.password.length > 0
    ) {
      this.accountApi.register(this.model).then(
        (response: IResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.router!.navigateToRoute('account-login');
          }
        }
      )
    }
  }
}
