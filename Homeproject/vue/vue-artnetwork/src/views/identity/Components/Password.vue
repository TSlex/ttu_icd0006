<template>
  <div v-if="isLoaded">
    <h4>{{$t('views.identity.PasswordHeader')}}</h4>

    <div class="row">
      <div class="col-md-6">
        <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
        <ErrorsList :errors="errors" />

        <div class="form-group">
          <label for="Input_OldPassword">{{$t('views.identity.CurrentPassword')}}</label>
          <input class="form-control" type="password" required v-model="passwordModel.currentPassword" />
        </div>
        <div class="form-group">
          <label for="Input_NewPassword">{{$t('views.identity.NewPassword')}}</label>
          <input class="form-control" type="password" maxlength="100" required v-model="passwordModel.newPassword" />
        </div>
        <div class="form-group">
          <label for="Input_ConfirmPassword">{{$t('views.identity.NewPasswordConfirm')}}</label>
          <input class="form-control" type="password" required v-model="passwordConfirmation" />
        </div>
        <button type="submit" class="btn btn-warning mt-2" @click="saveChanges">{{$t('views.common.SaveButton')}}</button>
      </div>
    </div>
  </div>
  <LoadingOverlay v-else :fixed="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import { IProfilePasswordDTO } from "../../../types/Identity/IProfilePasswordDTO";
import store from "@/store";
import { AccountApi } from "../../../services/AccountApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import ErrorListContainer from "../../../components/shared/ErrorListContainer.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ManagePassword extends ErrorListContainer {
  private successMsg: string | null = null;

  private passwordModel: IProfilePasswordDTO = {
    currentPassword: "",
    newPassword: "",
  };

  private passwordConfirmation: string = "";

  saveChanges() {
    if (
      this.passwordModel.currentPassword.length <= 0 ||
      this.passwordModel.newPassword.length <= 0
    ) {
      this.errors.push("Fields is required!");
    } else if (this.passwordModel.newPassword !== this.passwordConfirmation) {
      this.errors.push("Passwords should match!");
    } else {
      AccountApi.putPassword(this.passwordModel, this.jwt).then(
        (response: ResponseDTO) => {
          if (response.errors) {
            this.errors = response.errors;
          } else {
            this.successMsg = response.status;
            this.passwordModel!.currentPassword = "";
            this.passwordModel!.newPassword = "";
          }
        }
      );
    }
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
