<template>
  <div v-if="emailModel">
    <h4>Change email</h4>

    <div class="row">
      <div class="col-md-6">
        <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>
        <div class="form-group">
          <label for="Email">Current email</label>
          <div class="input-group">
            <input class="form-control" disabled type="text" v-model="emailModel.currentEmail" />
            <div class="input-group-append">
              <span class="input-group-text text-success font-weight-bold">✓</span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="Input_NewEmail">New email</label>
          <input class="form-control" type="email" v-model="emailModel.newEmail" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.NewEmail" data-valmsg-replace="true"></span>
        </div>
        <button class="btn btn-warning" @click="saveChanges">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { IProfileEmailDTO } from "../../../types/Identity/IProfileEmailDTO";
import { AccountApi } from "@/services/AccountApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class ManageEmail extends Vue {
  private emailModel: IProfileEmailDTO | null = null;

  private errors: string[] = [];
  private successMsg: string | null = null;

  get jwt() {
    return store.getters.getJwt;
  }

  beforeMount() {
    AccountApi.getEmail(this.jwt).then((response: string) => {
      this.emailModel = {
        currentEmail: response,
        newEmail: response
      };
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
