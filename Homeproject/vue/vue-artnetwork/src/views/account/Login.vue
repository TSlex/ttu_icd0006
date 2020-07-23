<template>
  <div class="text-center">
    <h1>{{$t('views.identity.LoginHeader')}}</h1>
    <div class="row justify-content-center">
      <div class="col-md-4">
        <section>
          <form>
            <hr />
            <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{error}}</li>
              </ul>
            </div>
            <div class="form-group">
              <label for="Input_Email">{{$t('bll.profiles.Email')}}</label>
              <input class="form-control" type="email" v-model="loginModel.email" />
              <span class="text-danger field-validation-valid"></span>
            </div>
            <div class="form-group">
              <label for="Input_Password">{{$t('bll.profiles.Password')}}</label>
              <input class="form-control" type="password" v-model="loginModel.password" />
              <span class="text-danger field-validation-valid" data-valmsg-for="Input.Password" data-valmsg-replace="true"></span>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary"
                @click="onSubmit"
                v-on:keyup.enter="onSubmit"
              >{{$t('views._layout.LoginButton')}}</button>
            </div>
            <div class="form-group">
              <p>
                <router-link to="register">{{$t('views.identity.RegisterNew')}}</router-link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ILoginDTO } from "@/types/Identity/ILoginDTO";
import store from "../../store";
import router from "../../router";
import { JwtResponseDTO } from "@/types/Response/JwtResponseDTO";

@Component
export default class AccountLogin extends Vue {
  private loginModel: ILoginDTO = {
    email: "",
    password: ""
  };

  private errors: string[] = [];

  onSubmit(e: Event): void {
    this.errors = [];

    if (
      this.loginModel.email.length > 0 &&
      this.loginModel.password.length > 0
    ) {
      store
        .dispatch("loginUser", this.loginModel)
        .then((response: JwtResponseDTO) => {
          if (response.errors) {
            this.errors = response.errors;
            console.log(response.errors);
          } else {
            router.push("/");
          }
        });
    }
    e.preventDefault();
  }
}
</script>
