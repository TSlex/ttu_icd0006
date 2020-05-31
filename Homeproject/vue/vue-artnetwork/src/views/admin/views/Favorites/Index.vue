<template>
  <div>
    <h1>Index</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Profile (ID)</th>
          <th>Post (ID)</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.postId}}</td>
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

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";

import IndexControls from "@/views/admin/components/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    IndexControls
  }
})
export default class FavoritesIndexA extends Vue {
  private Model: IFavoriteAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onEdit(id: string) {
    router.push({ name: "FavoritesEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "FavoritesDetailsA", params: { id } });
  }

  onDelete(id: string) {
    FavoritesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        FavoritesApi.index(this.jwt).then(
          (response: IFavoriteAdminDTO[]) => {
            this.Model = response;
          }
        );
      }
    });
  }

  mounted() {
    FavoritesApi.index(this.jwt).then(
      (response: IFavoriteAdminDTO[]) => {
        this.Model = response;
      }
    );
  }
}
</script>
