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

import { IPostAdminDTO } from "@/types/IPostDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { PostsApi } from "@/services/admin/PostsApi";

import IndexControls from "@/views/admin/components/IndexControls.vue";

@Component({
  components: {
    IndexControls
  }
})
export default class PostsIndexA extends Vue {
  private Model: IPostAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "PostsCreateA" });
  }

  onHistory(id: string) {
    PostsApi.history(id, this.jwt).then((response: IPostAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "PostsEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "PostsDetailsA", params: { id } });
  }

  onDelete(id: string) {
    PostsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        PostsApi.index(this.jwt).then((response: IPostAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    PostsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        PostsApi.index(this.jwt).then((response: IPostAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    PostsApi.index(this.jwt).then((response: IPostAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
