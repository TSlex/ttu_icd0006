<template>
  <AdminIndexWrapper v-if="isLoaded">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.favorites.ProfileId')}}</th>
          <th>{{$t('bll.favorites.PostId')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.postId}}</td>
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

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class FavoritesIndexA extends AdminIndex<IFavoriteAdminDTO> {
  onDelete(id: string) {
    FavoritesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        FavoritesApi.index(this.jwt).then((response: IFavoriteAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Favorite";
  }

  mounted() {
    FavoritesApi.index(this.jwt).then((response: IFavoriteAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
