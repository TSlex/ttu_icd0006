import { Router } from 'aurelia-router';
import { autoinject } from "aurelia-framework"
import { AppState } from "state/state";
import { AccountApi } from 'servises/AccountApi';
import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { IJwtResponseDTO } from 'types/Response/IJwtResponseDTO';

@autoinject
export class AccountLogin {

  private model: ILoginDTO = {
    email: "",
    password: ""
  }

  private errors: string[] = [];

  constructor(private accountApi: AccountApi, private appState: AppState, private router: Router) {
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.errors = [];

    if (
      this.model.email.length > 0 &&
      this.model.password.length > 0
    ) {
      this.accountApi.login(this.model).then(
        (response: IJwtResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.appState.jwt = response.token;
            this.router!.navigateToRoute('home');
          }
        }
      )
    }
  }
}
