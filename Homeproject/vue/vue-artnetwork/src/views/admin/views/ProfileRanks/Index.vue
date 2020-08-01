<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.profileranks.ProfileId')}}</th>
          <th>{{$t('bll.profileranks.RankId')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.rankId}}</td>
          <td>
            <IndexControls
              :model="item"
              v-on:onEdit="onEdit(item.id)"
              v-on:onDetails="onDetails(item.id)"
              v-on:onDelete="onDelete(item.id)"
              v-on:onRestore="onRestore(item.id)"
              v-on:onHistory="onHistory(item.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </AdminIndexWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IProfileRankAdminDTO } from "@/types/IProfileRankDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ProfileRanksApi } from "@/services/admin/ProfileRanksApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class ProfileRanksIndexA extends AdminIndex<
  IProfileRankAdminDTO
> {
  onDelete(id: string) {
    ProfileRanksApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfileRanksApi.index(this.jwt).then(
          (response: IProfileRankAdminDTO[]) => {
            this.model = response;
          }
        );
      }
    });
  }

  onRestore(id: string) {
    ProfileRanksApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfileRanksApi.index(this.jwt).then(
          (response: IProfileRankAdminDTO[]) => {
            this.model = response;
          }
        );
      }
    });
  }

  mounted() {
    ProfileRanksApi.index(this.jwt).then((response: IProfileRankAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  created() {
    this.modelName = "ProfileRank";
  }
}
</script>
