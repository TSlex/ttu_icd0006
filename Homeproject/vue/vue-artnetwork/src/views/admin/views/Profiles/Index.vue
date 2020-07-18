<template>
  <div>
    <h1>Index</h1>
    <p>
      <a href="#" @click="onCreate" @click.prevent>Create New</a>
    </p>
    <table class="table">
      <thead>
        <tr>
          <th>(ID)</th>
          <th>Title</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.postTitle}}</td>
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

import { IProfileAdminDTO } from "@/types/IProfileDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ProfilesApi } from "@/services/admin/ProfilesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

@Component({
  components: {
    IndexControls
  }
})
export default class ProfilesIndexA extends Vue {
  private Model: IProfileAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "ProfilesCreateA" });
  }

  onHistory(id: string) {
    ProfilesApi.history(id, this.jwt).then((response: IProfileAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "ProfilesEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "ProfilesDetailsA", params: { id } });
  }

  onDelete(id: string) {
    ProfilesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfilesApi.index(this.jwt).then((response: IProfileAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ProfilesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfilesApi.index(this.jwt).then((response: IProfileAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    ProfilesApi.index(this.jwt).then((response: IProfileAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
