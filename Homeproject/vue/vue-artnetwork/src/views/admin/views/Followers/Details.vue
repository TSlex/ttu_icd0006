<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:view-edit="onEdit" v-on:back-to-list="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.followers.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.followers.FollowerProfileId')}}</dt>
      <dd class="col-sm-10">{{model.followerProfileId}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" :deletable="false" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IFollowerAdminDTO } from "@/types/IFollowerDTO";

import { FollowersApi } from "@/services/admin/FollowersApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class FollowersDetailsA extends AdminDetails<IFollowerAdminDTO> {
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
