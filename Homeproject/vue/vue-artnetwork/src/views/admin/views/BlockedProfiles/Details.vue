<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:view-edit="onEdit" v-on:back-to-list="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.blockedprofiles.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.blockedprofiles.BProfileId')}}</dt>
      <dd class="col-sm-10">{{model.bProfileId}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.blockedprofiles.Reason')}}</dt>
      <dd class="col-sm-10"></dd>
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

import { IBlockedProfileAdminDTO } from "@/types/IBlockedProfileDTO";

import { BlockedProfilesApi } from "@/services/admin/BlockedProfilesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class BPDetailsA extends AdminDetails<IBlockedProfileAdminDTO> {
  created() {
    this.modelName = "BlockedProfile";
  }

  mounted() {
    BlockedProfilesApi.details(this.Id, this.jwt).then(
      (response: IBlockedProfileAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
