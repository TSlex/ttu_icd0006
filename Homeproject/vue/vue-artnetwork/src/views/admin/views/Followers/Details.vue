<template>
  <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">Profile (ID)</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">Follower (ID)</dt>
      <dd class="col-sm-10">{{model.followerProfileId}}</dd>

      <dt class="col-sm-2">CreatedBy</dt>
      <dd class="col-sm-10">{{model.createdBy}}</dd>

      <dt class="col-sm-2">CreatedAt</dt>
      <dd class="col-sm-10">{{model.createdAt}}</dd>

      <dt class="col-sm-2">ChangedBy</dt>
      <dd class="col-sm-10">{{model.changedBy}}</dd>

      <dt class="col-sm-2">ChangedAt</dt>
      <dd class="col-sm-10">{{model.changedAt}}</dd>
    </dl>
  </AdminDetailsWrapper>
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
  mounted() {
    FollowersApi.details(this.Id, this.jwt).then(
      (response: IFollowerAdminDTO) => {
        this.model = response;
      }
    );
  }
}
</script>
