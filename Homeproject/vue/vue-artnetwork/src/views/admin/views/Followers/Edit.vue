<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="followerProfileId">{{$t('bll.followers.FollowerProfileId')}}</label>
      <input class="form-control" type="text" id="followerProfileId" name="followerProfileId" v-model="model.followerProfileId" />
    </div>

    <i class="fa fa-arrow-down"></i>

    <div class="form-group">
      <label class="control-label" for="profileId">{{$t('bll.followers.ProfileId')}}</label>
      <input class="form-control" type="text" id="profileId" name="profileId" v-model="model.profileId" />
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IFollowerAdminDTO } from "@/types/IFollowerDTO";

import { FollowersApi } from "@/services/admin/FollowersApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component
export default class FollowersEditA extends AdminEdit<IFollowerAdminDTO> {
  onSubmit() {
    if (this.Id && this.model) {
      FollowersApi.edit(this.Id, this.model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }

  created() {
    this.modelName = "Follower";
  }

  mounted() {
    FollowersApi.details(this.Id, this.jwt).then(
      (response: IFollowerAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
