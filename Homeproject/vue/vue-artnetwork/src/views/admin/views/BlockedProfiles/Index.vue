<template>
  <div>
    <h1>Index</h1>

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
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IBlockedProfileAdminDTO } from "@/types/IBlockedProfileDTO";

import { BlockedProfilesApi } from "@/services/admin/BlockedProfilesApi";

import IndexControls from "@/views/admin/components/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    IndexControls
  }
})
export default class BPIndexA extends Vue {
  private Model: IBlockedProfileAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onEdit(id: string) {
    router.push({ name: "BPEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "BPDetailsA", params: { id } });
  }

  onDelete(id: string) {
    BlockedProfilesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        BlockedProfilesApi.index(this.jwt).then(
          (response: IBlockedProfileAdminDTO[]) => {
            this.Model = response;
          }
        );
      }
    });
  }

  mounted() {
    BlockedProfilesApi.index(this.jwt).then(
      (response: IBlockedProfileAdminDTO[]) => {
        this.Model = response;
      }
    );
  }
}
</script>
