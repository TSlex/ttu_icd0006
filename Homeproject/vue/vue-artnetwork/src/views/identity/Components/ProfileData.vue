<template>
  <div v-if="profileDataModel">
    <h4 class>Profile</h4>

    <div class="row">
      <div class="col-md-6">
        <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>
        <div class="form-group">
          <label class="control-label">Fullname</label>
          <input class="form-control" type="text" maxlength="100" v-model="profileDataModel.profileFullName" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileFullName" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label for="Input_UserName">Username</label>
          <input class="form-control" type="text" maxlength="300" v-model="profileDataModel.username" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.UserName" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label class="control-label" for="Input_ProfileWorkPlace">Work place</label>
          <input class="form-control" type="text" maxlength="300" v-model="profileDataModel.profileWorkPlace" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileWorkPlace" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label class="control-label" for="Input_ProfileAbout">About</label>
          <textarea class="form-control form-" maxlength="1000" v-model="profileDataModel.profileAbout"></textarea>
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileAbout" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label for="Input_PhoneNumber">Phone number</label>
          <input class="form-control" type="tel" maxlength="300" v-model="profileDataModel.phoneNumber" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.PhoneNumber" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="Input_ProfileGender">Gender</label>
          <select class="form-control" id="ProfileGender" v-model="profileDataModel.profileGender">
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="127">Own</option>
            <option value="128">Undefined</option>
          </select>
        </div>

        <div v-if="profileDataModel.profileGender === 127" class="form-group" id="profile-gender-own">
          <label for="Input_ProfileGenderOwn">Own variant</label>
          <input class="form-control" type="text" id="GenderOwn" v-model="profileDataModel.profileGenderOwn" />
          <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileGenderOwn" data-valmsg-replace="true"></span>
        </div>

        <button id="update-profile-button" class="btn btn-success align-self-center" @click="saveChanges">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { IProfileDataDTO } from "../../../types/Identity/IProfileDataDTO";
import { AccountApi } from "../../../services/AccountApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class ManageProfileData extends Vue {
  private profileDataModel: IProfileDataDTO | null = null;
  private isGenderOwn: boolean = false;

  private errors: string[] = [];
  private successMsg: string | null = null;

  get jwt() {
    return store.getters.getJwt;
  }

  beforeMount() {
    AccountApi.getProfileData(this.jwt).then(
      (response: IProfileDataDTO | null) => {
        this.profileDataModel = response;
      }
    );
  }

  saveChanges() {
    if (this.profileDataModel) {
      this.errors = [];
      this.successMsg = null;
      AccountApi.putProfileData(this.profileDataModel, this.jwt).then(
        (response: ResponseDTO) => {
          if (response.errors) {
            this.errors = response.errors;
          } else {
            this.successMsg = response.status;
          }
        }
      );
    }
  }
}
</script>
