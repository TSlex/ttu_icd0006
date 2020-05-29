<template>
  <div>
    <h4>Change password</h4>

    <div class="row">
      <div class="col-md-6">
        <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>
        <div class="form-group">
          <label for="Input_OldPassword">Current password</label>
          <input class="form-control" type="password" required v-model="passwordModel.currentPassword" />
        </div>
        <div class="form-group">
          <label for="Input_NewPassword">New password</label>
          <input class="form-control" type="password" maxlength="100" required v-model="passwordModel.newPassword" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.NewPassword" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label for="Input_ConfirmPassword">New password confirmation</label>
          <input class="form-control" type="password" required v-model="passwordConfirmation" />
        </div>
        <button type="submit" class="btn btn-warning" @click="saveChanges">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import { IProfilePasswordDTO } from "../../../types/Identity/IProfilePasswordDTO";
import store from "@/store";
import { AccountApi } from "../../../services/AccountApi";
import { ResponseDTO } from '@/types/Response/ResponseDTO';

@Component({
  components: {
    ImageComponent
  }
})
export default class ManagePassword extends Vue {
  private errors: string[] = [];
  private successMsg: string | null = null;

  private passwordModel: IProfilePasswordDTO = {
    currentPassword: "",
    newPassword: ""
  };

  private passwordConfirmation: string = "";

  get jwt() {
    return store.getters.getJwt;
  }

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
}
</script>
