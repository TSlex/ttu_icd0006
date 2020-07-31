<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>Профиль (ID)</th>
          <th></th>
          <th>Заброкированный профиль (ID)</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>-&gt;</td>
          <td>{{item.bProfileId}}</td>
          <td>{{item.deletedAt != null}}</td>
          <td>
            <IndexControls
              :model="item"
              v-on:onEdit="onEdit(item.id)"
              v-on:onDetails="onDetails(item.id)"
              v-on:onDelete="onDelete(item.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </AdminIndexWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IBlockedProfileAdminDTO } from "@/types/IBlockedProfileDTO";

import { BlockedProfilesApi } from "@/services/admin/BlockedProfilesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class BPIndexA extends AdminIndex<IBlockedProfileAdminDTO> {
  created() {
    this.modelName = "BlockedProfile";
  }

  onDelete(id: string) {
    BlockedProfilesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        BlockedProfilesApi.index(this.jwt).then(
          (response: IBlockedProfileAdminDTO[]) => {
            this.model = response;
          }
        );
      }
    });
  }

  mounted() {
    BlockedProfilesApi.index(this.jwt).then(
      (response: IBlockedProfileAdminDTO[]) => {
        this.model = response;
      }
    );
  }
}
</script>
