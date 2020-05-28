<template>
  <div>
    <h4>Change password</h4>

    <div class="row">
      <div class="col-md-6">
        <form id="change-password-form" method="post" novalidate="novalidate">
          <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
            <ul>
              <li style="display:none"></li>
            </ul>
          </div>
          <div class="form-group">
            <label for="Input_OldPassword">Current password</label>
            <input class="form-control" type="password" required />
          </div>
          <div class="form-group">
            <label for="Input_NewPassword">New password</label>
            <input class="form-control" type="password" maxlength="100" required />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.NewPassword" data-valmsg-replace="true"></span>
          </div>
          <div class="form-group">
            <label for="Input_ConfirmPassword">New password confirmation</label>
            <input class="form-control" type="password" required />
          </div>
          <button type="submit" class="btn btn-warning">Save</button>
        </form>
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

@Component({
  components: {
    ImageComponent
  }
})
export default class ManagePassword extends Vue {
  private errors: string[] = [];
  private successMsg: string | null = null;

  private passwordPutModel: IProfilePasswordDTO = {
    currentPassword: "",
    newPassword: ""
  };

  private passwordConfirmation: string = "";

  get jwt() {
    return store.getters.getJwt;
  }

  submit() {
    if (
      this.passwordPutModel.currentPassword.length <= 0 ||
      this.passwordPutModel.newPassword.length <= 0
    ) {
      this.errors.push("Fields is required!");
    } else if (
      this.passwordPutModel.newPassword !== this.passwordConfirmation
    ) {
      this.errors.push("Passwords should match!");
    } else {
      // AccountApi.putPassword()
    }
  }
}
</script>
