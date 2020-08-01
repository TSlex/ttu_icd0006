<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.profileranks.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.profileranks.RankId')}}</dt>
      <dd class="col-sm-10">{{model.rankId}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IProfileRankAdminDTO } from "@/types/IProfileRankDTO";

import { ProfileRanksApi } from "@/services/admin/ProfileRanksApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ProfileRanksDetailsA extends AdminDetails<
  IProfileRankAdminDTO
> {
  created() {
    this.modelName = "ProfileRank";
  }

  mounted() {
    ProfileRanksApi.details(this.Id, this.jwt).then(
      (response: IProfileRankAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
