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
          <th>Profile (ID)</th>
          <th>Post (ID)</th>
          <th>Value</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.profileId}}</td>
          <td>{{item.postId}}</td>
          <td>{{item.commentValue}}</td>
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

import { ICommentAdminDTO } from "@/types/ICommentDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

@Component({
  components: {
    IndexControls
  }
})
export default class CommentsIndexA extends Vue {
  private Model: ICommentAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "CommentsCreateA" });
  }

  onHistory(id: string) {
    CommentsApi.history(id, this.jwt).then((response: ICommentAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "CommentsEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "CommentsDetailsA", params: { id } });
  }

  onDelete(id: string) {
    CommentsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        CommentsApi.index(this.jwt).then((response: ICommentAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    CommentsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        CommentsApi.index(this.jwt).then((response: ICommentAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    CommentsApi.index(this.jwt).then((response: ICommentAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
