<template>
  <div v-if="Id && Model">
    <h1>{{$t('views.common.DetailsHeader')}}</h1>
    <hr />

    <div>
      <dl class="row">
        <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
        <dd class="col-sm-10">{{Model.id}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.UserName')}}</dt>
        <dd class="col-sm-10">{{Model.userName}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.Email')}}</dt>
        <dd class="col-sm-10">{{Model.email}}</dd>
      </dl>
      <hr />
      <dl class="row">
        <dt class="col-sm-2">{{$t('bll.profiles.PhoneNumber')}}</dt>
        <dd class="col-sm-10">{{Model.phoneNumber}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.ProfileFullName')}}</dt>
        <dd class="col-sm-10">{{Model.profileFullName}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.ProfileAbout')}}</dt>
        <dd class="col-sm-10">{{Model.profileAbout}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.ProfileWorkPlace')}}</dt>
        <dd class="col-sm-10">{{Model.profileWorkPlace}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.ProfileGender')}}</dt>
        <dd class="col-sm-10">{{resolveGender(Model.profileGender)}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.ProfileGenderOwn')}}</dt>
        <dd class="col-sm-10">{{Model.profileGenderOwn}}</dd>

        <dt class="col-sm-2">{{$t('bll.profiles.ProfileStatus')}}</dt>
        <dd class="col-sm-10">{{Model.profileStatus}}</dd>
      </dl>
      <hr />
      <dl class="row">
        <dt class="col-sm-2">{{$t('bll.profiles.Experience')}}</dt>
        <dd class="col-sm-10">{{Model.experience}}</dd>
      </dl>
      <hr />
      <dl class="row">
        <dt class="col-sm-5">{{$t('bll.profiles.PhoneNumberConfirmed')}}</dt>
        <dd class="col-sm-5">
          <input class="check-box" disabled="disabled" type="checkbox" :checked="Model.phoneNumberConfirmed" />
        </dd>

        <dt class="col-sm-5">{{$t('bll.profiles.LockoutEnabled')}}</dt>
        <dd class="col-sm-5">
          <input class="check-box" disabled="disabled" type="checkbox" :checked="Model.lockoutEnabled" />
        </dd>

        <dt class="col-sm-5">{{$t('bll.profiles.EmailConfirmed')}}</dt>
        <dd class="col-sm-5">
          <input class="check-box" disabled="disabled" type="checkbox" :checked="Model.emailConfirmed" />
        </dd>

        <dt class="col-sm-5">{{$t('bll.profiles.AccessFailedCount')}}</dt>
        <dd class="col-sm-5">{{Model.accessFailedCount}}</dd>
      </dl>
      <hr />
      <dl class="row">
        <dt class="col-sm-2">{{$t('bll.common.CreatedBy')}}</dt>
        <dd class="col-sm-10">{{Model.createdBy}}</dd>

        <dt class="col-sm-2">{{$t('bll.common.CreatedAt')}}</dt>
        <dd class="col-sm-10">{{Model.createdAt}}</dd>

        <dt class="col-sm-2">{{$t('bll.common.ChangedBy')}}</dt>
        <dd class="col-sm-10">{{Model.changedBy}}</dd>

        <dt class="col-sm-2">{{$t('bll.common.ChangedAt')}}</dt>
        <dd class="col-sm-10">{{Model.changedAt}}</dd>

        <dt class="col-sm-2">{{$t('bll.common.DeletedBy')}}</dt>
        <dd class="col-sm-10">{{Model.deletedBy}}</dd>

        <dt class="col-sm-2">{{$t('bll.common.DeletedAt')}}</dt>
        <dd class="col-sm-10">{{Model.deletedAt}}</dd>
      </dl>
    </div>
    <hr />
    <div>
      <button class="btn btn-primary mr-1" @click="onEdit(Model.id)">Edit</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IProfileAdminDTO } from "@/types/IProfileDTO";

import { ProfilesApi } from "@/services/admin/ProfilesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { resolveGender } from "@/translations/gender";
import { ProfileGender } from "../../../../types/Enums/ProfileGender";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ProfilesDetailsA extends Vue {
  @Prop()
  private id!: string;

  private Model: IProfileAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  resolveGender(gender: ProfileGender) {
    return resolveGender(gender);
  }

  onEdit(id: string) {
    router.push({ name: "ProfilesEditA", params: { id } });
  }

  mounted() {
    ProfilesApi.details(this.Id, this.jwt).then(
      (response: IProfileAdminDTO) => {
        this.Model = response;
      }
    );
  }
}
</script>
