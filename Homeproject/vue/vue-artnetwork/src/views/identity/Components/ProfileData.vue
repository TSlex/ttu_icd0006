<template>
  <div>
    <h4 class>Profile</h4>

    <div class="row">
      <div class="col-md-6">
        <form id="profile-form" class method="post" novalidate="novalidate">
          <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
            <ul>
              <li style="display:none"></li>
            </ul>
          </div>
          <div class="form-group">
            <label class="control-label" for="Input_ProfileFullName">Fullname</label>
            <input
              class="form-control"
              type="text"
              data-val="true"
              data-val-maxlength="The field Fullname must be a string or array type with a maximum length of '100'."
              data-val-maxlength-max="100"
              data-val-minlength="The field Fullname must be a string or array type with a minimum length of '1'."
              data-val-minlength-min="1"
              id="Input_ProfileFullName"
              maxlength="100"
              name="Input.ProfileFullName"
              value="ывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывыв"
            />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileFullName" data-valmsg-replace="true"></span>
          </div>
          <div class="form-group">
            <label for="Input_UserName">Username</label>
            <input
              class="form-control"
              type="text"
              data-val="true"
              data-val-maxlength="The field Username must be a string or array type with a maximum length of '300'."
              data-val-maxlength-max="300"
              data-val-required="The Username field is required."
              id="Input_UserName"
              maxlength="300"
              name="Input.UserName"
              value="admin"
            />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.UserName" data-valmsg-replace="true"></span>
          </div>
          <div class="form-group">
            <label class="control-label" for="Input_ProfileWorkPlace">Work place</label>
            <input
              class="form-control"
              type="text"
              data-val="true"
              data-val-maxlength="The field Work place must be a string or array type with a maximum length of '300'."
              data-val-maxlength-max="300"
              id="Input_ProfileWorkPlace"
              maxlength="300"
              name="Input.ProfileWorkPlace"
              value="https://vk.com/wareware_san"
            />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileWorkPlace" data-valmsg-replace="true"></span>
          </div>
          <div class="form-group">
            <label class="control-label" for="Input_ProfileAbout">About</label>
            <textarea
              class="form-control form-"
              data-val="true"
              data-val-maxlength="The field About must be a string or array type with a maximum length of '1000'."
              data-val-maxlength-max="1000"
              id="Input_ProfileAbout"
              maxlength="1000"
              name="Input.ProfileAbout"
            >ывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывывыв</textarea>
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileAbout" data-valmsg-replace="true"></span>
          </div>
          <div class="form-group">
            <label for="Input_PhoneNumber">Phone number</label>
            <input
              class="form-control"
              type="tel"
              data-val="true"
              data-val-maxlength="The field Phone number must be a string or array type with a maximum length of '300'."
              data-val-maxlength-max="300"
              data-val-phone="The Phone number field is not a valid phone number."
              id="Input_PhoneNumber"
              maxlength="300"
              name="Input.PhoneNumber"
              value="+37253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937253364729372533647293725336472937"
            />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.PhoneNumber" data-valmsg-replace="true"></span>
          </div>

          <div class="form-group">
            <label class="control-label" for="Input_ProfileGender">Gender</label>
            <select
              class="form-control"
              data-val="true"
              data-val-required="The Gender field is required."
              id="Input_ProfileGender"
              name="Input.ProfileGender"
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="127">Own</option>
              <option selected="selected" value="128">Undefined</option>
            </select>
          </div>

          <div class="form-group d-none" id="profile-gender-own">
            <label for="Input_ProfileGenderOwn">Own variant</label>
            <input class="form-control" type="text" id="Input_ProfileGenderOwn" name="Input.ProfileGenderOwn" value />
            <span class="text-danger field-validation-valid" data-valmsg-for="Input.ProfileGenderOwn" data-valmsg-replace="true"></span>
          </div>

          <button id="update-profile-button" type="submit" class="btn btn-success align-self-center">Save</button>
          <input
            name="__RequestVerificationToken"
            type="hidden"
            value="CfDJ8ImaPa_EwGJOqso6edmeSTSThZaKNuSglyvSv_zvlsTkVyGGvE0UDrz1xLVgvaOCTPkoQ-avXwOebjWOsD7xZD6WJQSTaNm-B1GLpK6sFxo4bssSKppz6-hHxvvPUv3ZLS7YwVcq1AwPpeP8LhXz5EA4e-iOI1OIZwEVtrVo_Ol52_iENb4b5L0eNnOyS5gYfQ"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";

@Component({
  components: {
    ImageComponent
  }
})
export default class ManageProfileData extends Vue {
  get jwt() {
    return store.getters.getJwt;
  }
}
</script>
