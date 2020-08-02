<template>
  <div class="text-center">
    <h1>{{$t('views.identity.LoginHeader')}}</h1>
    <div class="row justify-content-center">
      <div class="col-md-4">
        <section>
          <form>
            <hr />
            <ErrorsList :errors="errors" />
            <div class="form-group">
              <label for="Input_Email">{{$t('bll.profiles.Email')}}*</label>
              <input class="form-control" type="email" v-model="loginModel.email" />
              <span class="text-danger field-validation-valid"></span>
            </div>
            <div class="form-group">
              <label for="Input_Password">{{$t('bll.profiles.Password')}}*</label>
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
import ErrorListContainer from "@/components/shared/ErrorListContainer.vue";

import { requireError } from "@/translations/validation.ts";

@Component
export default class AccountLogin extends ErrorListContainer {
  private loginModel: ILoginDTO = {
    email: "",
    password: "",
  };

  onSubmit(e: Event): void {
    this.errors = [];
    e.preventDefault();

    if (!(this.loginModel.email.length > 0)) {
      this.errors.push(requireError("bll.profiles.Email"));
    }
    if (!(this.loginModel.password.length > 0)) {
      this.errors.push(requireError("bll.profiles.Password"));
    }
    if (this.errors.length > 0) return;
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

  // if (!(this.loginModel.email.length > 0)) {
  //   }
  //   if (!(this.loginModel.password.length > 0)) {
  //   }
  //   if (this.errors.length > 0) return;
}
</script>
