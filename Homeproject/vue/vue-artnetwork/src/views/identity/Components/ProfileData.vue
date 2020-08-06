<template>
  <div v-if="isLoaded">
    <h4 class>{{$t('views.identity.ProfileHeader')}}</h4>

    <div class="row">
      <div class="col-md-6">
        <div v-if="successMsg" class="alert alert-success" role="alert">{{successMsg}}</div>
        <ErrorsList :errors="errors" />

        <div class="form-group">
          <label class="control-label">{{$t('bll.profiles.ProfileFullName')}}</label>
          <input class="form-control" type="text" maxlength="100" v-model="profileDataModel.profileFullName" />
        </div>
        <div class="form-group">
          <label class="control-label">{{$t('bll.profiles.UserName')}}*</label>
          <input class="form-control" type="text" maxlength="300" v-model="profileDataModel.username" />
        </div>
        <div class="form-group">
          <label class="control-label">{{$t('bll.profiles.ProfileWorkPlace')}}</label>
          <input class="form-control" type="text" maxlength="300" v-model="profileDataModel.profileWorkPlace" />
        </div>
        <div class="form-group">
          <label class="control-label">{{$t('bll.profiles.ProfileAbout')}}</label>
          <textarea class="form-control form-" maxlength="1000" v-model="profileDataModel.profileAbout"></textarea>
        </div>
        <div class="form-group">
          <label class="control-label">{{$t('bll.profiles.PhoneNumber')}}</label>
          <input class="form-control" type="tel" maxlength="300" v-model="profileDataModel.phoneNumber" />
        </div>

        <div class="form-group">
          <label class="control-label">{{$t('bll.profiles.ProfileGender')}}</label>
          <select class="form-control" id="ProfileGender" v-model.number="profileDataModel.profileGender">
            <option value="0">{{resolveGender(ProfileGender.Male)}}</option>
            <option value="1">{{resolveGender(ProfileGender.Female)}}</option>
            <option value="127">{{resolveGender(ProfileGender.Own)}}</option>
            <option value="128">{{resolveGender(ProfileGender.Undefined)}}</option>
          </select>
        </div>

        <div v-if="Number(profileDataModel.profileGender) === 127" class="form-group" id="profile-gender-own">
          <label for="Input_ProfileGenderOwn">{{$t('bll.profiles.ProfileGenderOwn')}}*</label>
          <input class="form-control" type="text" id="GenderOwn" v-model="profileDataModel.profileGenderOwn" />
        </div>

        <button
          id="update-profile-button"
          class="btn btn-success align-self-center"
          @click="saveChanges"
        >{{$t('views.common.SaveButton')}}</button>
      </div>
    </div>
  </div>
  <LoadingOverlay v-else :fixed="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { IProfileDataDTO } from "../../../types/Identity/IProfileDataDTO";
import { AccountApi } from "../../../services/AccountApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { ProfileGender } from "@/types/Enums/ProfileGender";
import { resolveGender } from "@/translations/gender";
import IdentityStore from "../../../components/shared/IdentityStore.vue";
import ErrorListContainer from "../../../components/shared/ErrorListContainer.vue";
import { requireError } from "@/translations/validation";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ManageProfileData extends ErrorListContainer {
  private profileDataModel: IProfileDataDTO | null = null;
  private isGenderOwn: boolean = false;

  private successMsg: string | null = null;

  get ProfileGender() {
    return ProfileGender;
  }

  resolveGender(gender: ProfileGender) {
    return resolveGender(gender);
  }

  beforeMount() {
    AccountApi.getProfileData(this.jwt).then(
      (response: IProfileDataDTO | null) => {
        this.profileDataModel = response;
        this.isLoaded = true;
      }
    );
  }

  saveChanges() {
    this.errors = [];
    this.successMsg = null;

    if (!(this.profileDataModel!.username.length > 0)) {
      this.errors.push(requireError("bll.profiles.UserName"));
    }
    if (
      !(this.profileDataModel!.profileGenderOwn?.length > 0) &&
      Number(this.profileDataModel!.profileGender) === 127
    ) {
      this.errors.push(requireError("bll.profiles.ProfileGenderOwn"));
    }
    if (this.errors.length > 0) return;

    AccountApi.putProfileData(this.profileDataModel!, this.jwt).then(
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
</script>
