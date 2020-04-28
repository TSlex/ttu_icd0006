<template>
  <div>
    <h1>Log in</h1>
    <div class="row">
      <div class="col-md-4">
        <section>
          <form>
            <h4>Use a local account to log in.</h4>
            <hr />
            <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
              <ul>
                <li style="display:none"></li>
              </ul>
            </div>
            <div class="form-group">
              <label for="Input_Email">Email</label>
              <input
                class="form-control"
                type="email"
                v-model="loginModel.email"
              />
              <span
                class="text-danger field-validation-valid"
              ></span>
            </div>
            <div class="form-group">
              <label for="Input_Password">Password</label>
              <input
                class="form-control"
                type="password"
                v-model="loginModel.password"
              />
              <span
                class="text-danger field-validation-valid"
                data-valmsg-for="Input.Password"
                data-valmsg-replace="true"
              ></span>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary" @click="onSubmit">Log in</button>
            </div>
            <div class="form-group">
              <p>
                <a
                  id="forgot-password"
                  href="/identity/account/forgotpassword"
                >Forgot your password?</a>
              </p>
              <p>
                <a href="/identity/account/register?returnUrl=%2F">Register as a new user</a>
              </p>
            </div>
          </form>
        </section>
      </div>
      <div class="col-md-6 col-md-offset-2">
        <section>
          <h4>Use another service to log in.</h4>
          <hr />
          <div>
            <p>
              There are no external authentication services configured. See
              <a
                href="https://go.microsoft.com/fwlink/?LinkID=532715"
              >this article</a>
              for details on setting up this ASP.NET application to support logging in via external services.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ILoginDTO } from "@/types/ILoginDTO";
import store from "../../store";
import router from "../../router";

@Component
export default class AccountLogin extends Vue {
  private loginModel: ILoginDTO = {
    email: "",
    password: ""
  };;

  private loginWasOk: boolean | null = null;

  onSubmit(): void {
    console.log(this.loginModel);
    if (
      this.loginModel!.email.length > 0 &&
      this.loginModel!.password.length > 0
    ) {
      store
        .dispatch("loginUser", this.loginModel)
        .then((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this.loginWasOk = true;
            router.push('/');
          } else {
            this.loginWasOk = false;
          }
        });
    }
  }
}
</script>
