<template>
  <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">Profile (ID)</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">BProfile (ID)</dt>
      <dd class="col-sm-10">{{model.bProfileId}}</dd>

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

import { IBlockedProfileAdminDTO } from "@/types/IBlockedProfileDTO";

import { BlockedProfilesApi } from "@/services/admin/BlockedProfilesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class BPDetailsA extends AdminDetails<IBlockedProfileAdminDTO> {
  mounted() {
    BlockedProfilesApi.details(this.Id, this.jwt).then(
      (response: IBlockedProfileAdminDTO) => {
        this.model = response;
      }
    );
  }
}
</script>
