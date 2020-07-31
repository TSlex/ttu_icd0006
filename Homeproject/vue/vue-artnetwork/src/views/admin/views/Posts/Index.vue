<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
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
        <tr v-for="item in model" :key="item.id">
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
  </AdminIndexWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IPostAdminDTO } from "@/types/IPostDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { PostsApi } from "@/services/admin/PostsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class PostsIndexA extends AdminIndex<IPostAdminDTO> {
  onHistory(id: string) {
    PostsApi.history(id, this.jwt).then((response: IPostAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    PostsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        PostsApi.index(this.jwt).then((response: IPostAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    PostsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        PostsApi.index(this.jwt).then((response: IPostAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Post";
  }

  mounted() {
    PostsApi.index(this.jwt).then((response: IPostAdminDTO[]) => {
      this.model = response;
    });
  }
}
</script>
