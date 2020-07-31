<template>
  <div v-if="id && model">
    <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
      <div>
        <dl class="row">
          <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
          <dd class="col-sm-10">{{model.id}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.UserName')}}</dt>
          <dd class="col-sm-10">{{model.userName}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.Email')}}</dt>
          <dd class="col-sm-10">{{model.email}}</dd>
        </dl>
        <hr />
        <dl class="row">
          <dt class="col-sm-2">{{$t('bll.profiles.PhoneNumber')}}</dt>
          <dd class="col-sm-10">{{model.phoneNumber}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.ProfileFullName')}}</dt>
          <dd class="col-sm-10">{{model.profileFullName}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.ProfileAbout')}}</dt>
          <dd class="col-sm-10">{{model.profileAbout}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.ProfileWorkPlace')}}</dt>
          <dd class="col-sm-10">{{model.profileWorkPlace}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.ProfileGender')}}</dt>
          <dd class="col-sm-10">{{resolveGender(model.profileGender)}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.ProfileGenderOwn')}}</dt>
          <dd class="col-sm-10">{{model.profileGenderOwn}}</dd>

          <dt class="col-sm-2">{{$t('bll.profiles.ProfileStatus')}}</dt>
          <dd class="col-sm-10">{{model.profileStatus}}</dd>
        </dl>
        <hr />
        <dl class="row">
          <dt class="col-sm-2">{{$t('bll.profiles.Experience')}}</dt>
          <dd class="col-sm-10">{{model.experience}}</dd>
        </dl>
        <hr />
        <dl class="row">
          <dt class="col-sm-5">{{$t('bll.profiles.PhoneNumberConfirmed')}}</dt>
          <dd class="col-sm-5">
            <input class="check-box" disabled="disabled" type="checkbox" :checked="model.phoneNumberConfirmed" />
          </dd>

          <dt class="col-sm-5">{{$t('bll.profiles.LockoutEnabled')}}</dt>
          <dd class="col-sm-5">
            <input class="check-box" disabled="disabled" type="checkbox" :checked="model.lockoutEnabled" />
          </dd>

          <dt class="col-sm-5">{{$t('bll.profiles.EmailConfirmed')}}</dt>
          <dd class="col-sm-5">
            <input class="check-box" disabled="disabled" type="checkbox" :checked="model.emailConfirmed" />
          </dd>

          <dt class="col-sm-5">{{$t('bll.profiles.AccessFailedCount')}}</dt>
          <dd class="col-sm-5">{{model.accessFailedCount}}</dd>
        </dl>
        <hr />
        <MetaDetailsSection :model="model" />
      </div>
    </AdminDetailsWrapper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IProfileAdminDTO } from "@/types/IProfileDTO";

import { ProfilesApi } from "@/services/admin/ProfilesApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { resolveGender } from "@/translations/gender";
import { ProfileGender } from "@/types/Enums/ProfileGender";

import AdminDetails from "@/views/admin/components/shared/base/AdminDetails.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ProfilesDetailsA extends AdminDetails<IProfileAdminDTO> {
  resolveGender(gender: ProfileGender) {
    return resolveGender(gender);
  }

  created() {
    this.modelName = "Profile";
  }

  mounted() {
    ProfilesApi.details(this.id, this.jwt).then(
      (response: IProfileAdminDTO) => {
        this.model = response;
      }
    );
  }
}
</script>
