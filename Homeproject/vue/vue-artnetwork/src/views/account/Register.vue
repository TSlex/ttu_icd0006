<template>
  <div>
    <h1>Register</h1>

    <div class="row">
      <div class="col-md-4">
        <form>
          <h4>Create a new account.</h4>
          <hr />
          <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
            <ul>
              <li style="display:none"></li>
            </ul>
          </div>
          <div class="form-group">
            <label for="Input_Username">Username</label>
            <input
              class="form-control"
              type="text"
              v-model="registerModel.username"
            />
            <span
              class="text-danger field-validation-valid"
              data-valmsg-for="Input.Username"
              data-valmsg-replace="true"
            ></span>
          </div>
          <div class="form-group">
            <label for="Input_Email">Email</label>
            <input
              class="form-control"
              type="email"
              v-model="registerModel.email"
            />
            <span
              class="text-danger field-validation-valid"
              data-valmsg-for="Input.Email"
              data-valmsg-replace="true"
            ></span>
          </div>
          <div class="form-group">
            <label for="Input_Password">Password</label>
            <input
              class="form-control"
              type="password"
              v-model="registerModel.password"
            />
            <span
              class="text-danger field-validation-valid"
              data-valmsg-for="Input.Password"
              data-valmsg-replace="true"
            ></span>
          </div>
          <div class="form-group">
            <label for="Input_ConfirmPassword">Confirm password</label>
            <input
              class="form-control"
              type="password"
              v-model="registerModel.passwordConfirmation"
            />
            <span
              class="text-danger field-validation-valid"
              data-valmsg-for="Input.ConfirmPassword"
              data-valmsg-replace="true"
            ></span>
          </div>
          <button type="button" class="btn btn-primary" @click="onSubmit">Register</button>
        </form>
      </div>
      <div class="col-md-6 col-md-offset-2">
        <section>
          <h4>Use another service to register.</h4>
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
import { IRegisterDTO } from "@/types/IRegisterDTO";
import store from "../../store";
import router from "../../router";

@Component
export default class AccountRegister extends Vue {
  private registerModel: IRegisterDTO = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  private registrationWasOk: boolean | null = null;

  onSubmit(): void {
    console.log(this.registerModel);
    if (
      this.registerModel.username.length > 0 &&
      this.registerModel.email.length > 0 &&
      this.registerModel.password.length > 0 &&
      this.registerModel.password === this.registerModel.passwordConfirmation
    ) {
      store
        .dispatch("registerUser", this.registerModel)
        .then((isRegistered: boolean) => {
          if (isRegistered) {
            this.registrationWasOk = true;
            router.push('/account/register');
          } else {
            this.registrationWasOk = false;
          }
        });
    }
  }
}
</script>
