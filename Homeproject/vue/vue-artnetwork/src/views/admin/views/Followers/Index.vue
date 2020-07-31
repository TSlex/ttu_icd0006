<template>
  <div>
    <h1>Index</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Follower (ID)</th>
          <th></th>
          <th>Profile (ID)</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.followerProfileId}}</td>
          <td>-&gt;</td>
          <td>{{item.profileId}}</td>
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

import { IFollowerAdminDTO } from "@/types/IFollowerDTO";

import { FollowersApi } from "@/services/admin/FollowersApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    IndexControls,
  },
})
export default class FollowersIndexA extends Vue {
  private Model: IFollowerAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onEdit(id: string) {
    router.push({ name: "FollowersEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "FollowersDetailsA", params: { id } });
  }

  onDelete(id: string) {
    FollowersApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        FollowersApi.index(this.jwt).then((response: IFollowerAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    FollowersApi.index(this.jwt).then((response: IFollowerAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
