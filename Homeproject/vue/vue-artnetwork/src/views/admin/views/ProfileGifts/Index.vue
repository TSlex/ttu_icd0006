<template>
  <div>
    <h1>Index</h1>
    <p>
      <a href="#" @click="onCreate" @click.prevent>Create New</a>
    </p>
    <table class="table">
      <thead>
        <tr>
          <th>Profile (ID)</th>
          <th>Gift (ID)</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.giftId}}</td>
          <td>{{item.deletedAt != null}}</td>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IProfileGiftAdminDTO } from "@/types/IProfileGiftDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ProfileGiftsApi } from "@/services/admin/ProfileGiftsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

@Component({
  components: {
    IndexControls
  }
})
export default class ProfileGiftsIndexA extends Vue {
  private Model: IProfileGiftAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "ProfileGiftsCreateA" });
  }

  onEdit(id: string) {
    router.push({ name: "ProfileGiftsEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "ProfileGiftsDetailsA", params: { id } });
  }

  onDelete(id: string) {
    ProfileGiftsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfileGiftsApi.index(this.jwt).then(
          (response: IProfileGiftAdminDTO[]) => {
            this.Model = response;
          }
        );
      }
    });
  }

  onRestore(id: string) {
    ProfileGiftsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfileGiftsApi.index(this.jwt).then(
          (response: IProfileGiftAdminDTO[]) => {
            this.Model = response;
          }
        );
      }
    });
  }

  mounted() {
    ProfileGiftsApi.index(this.jwt).then((response: IProfileGiftAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
