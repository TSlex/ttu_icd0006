<template>
  <AdminIndexWrapper v-if="isLoaded">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.followers.FollowerProfileId')}}</th>
          <th></th>
          <th>{{$t('bll.followers.ProfileId')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.followerProfileId}}</td>
          <td>-&gt;</td>
          <td>{{item.profileId}}</td>
          <td>
            <IndexControls
              :model="item"
              v-on:view-edit="onEdit(item.id)"
              v-on:view-details="onDetails(item.id)"
              v-on:view-delete="onDelete(item.id)"
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

import { IFollowerAdminDTO } from "@/types/IFollowerDTO";

import { FollowersApi } from "@/services/admin/FollowersApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class FollowersIndexA extends AdminIndex<IFollowerAdminDTO> {
  onDelete(id: string) {
    FollowersApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        FollowersApi.index(this.jwt).then((response: IFollowerAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Follower";
  }

  mounted() {
    FollowersApi.index(this.jwt).then((response: IFollowerAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
