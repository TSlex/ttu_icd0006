<template>
  <div v-if="isLoaded">
    <h4>{{$t('views.identity.EmailHeader')}}</h4>

    <div class="row">
      <div class="col-md-6">
        <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
        <ErrorsList :errors="errors" />

        <div class="form-group">
          <label for="Email">{{$t('views.identity.CurrentEmail')}}</label>
          <div class="input-group">
            <input class="form-control" disabled type="text" v-model="emailModel.currentEmail" />
            <div class="input-group-append">
              <span class="input-group-text text-success font-weight-bold">✓</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="Input_NewEmail">{{$t('bll.profiles.Email')}}</label>
          <input class="form-control" type="email" v-model="emailModel.newEmail" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.NewEmail" data-valmsg-replace="true"></span>
        </div>
        <button class="btn btn-warning mt-2" @click="saveChanges">{{$t('views.common.SaveButton')}}</button>
      </div>
    </div>
  </div>
  <LoadingOverlay v-else :fixed="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { IProfileEmailDTO } from "../../../types/Identity/IProfileEmailDTO";
import { AccountApi } from "@/services/AccountApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import ErrorListContainer from "../../../components/shared/ErrorListContainer.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ManageEmail extends ErrorListContainer {
  private emailModel: IProfileEmailDTO | null = null;

  private successMsg: string | null = null;

  beforeMount() {
    AccountApi.getEmail(this.jwt).then((response: string) => {
      this.emailModel = {
        currentEmail: response,
        newEmail: response,
      };
      this.isLoaded = true;
    });
  }

  saveChanges() {
    if (this.emailModel) {
      this.errors = [];
      this.successMsg = null;
      AccountApi.putEmail(this.emailModel, this.jwt).then(
        (response: ResponseDTO) => {
          if (response.errors) {
            this.errors = response.errors;
          } else {
            this.successMsg = response.status;
            this.emailModel!.currentEmail = this.emailModel!.newEmail;
          }
        }
      );
    }
  }
}
</script>
