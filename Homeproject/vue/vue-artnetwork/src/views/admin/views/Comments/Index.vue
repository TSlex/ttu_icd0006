<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.comments.ProfileId')}}</th>
          <th>{{$t('bll.comments.PostId')}}</th>
          <th>{{$t('bll.comments.CommentValue')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.postId}}</td>
          <td>{{item.commentValue}}</td>
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

import { ICommentAdminDTO } from "@/types/ICommentDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class CommentsIndexA extends AdminIndex<ICommentAdminDTO> {
  onHistory(id: string) {
    CommentsApi.history(id, this.jwt).then((response: ICommentAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    CommentsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        CommentsApi.index(this.jwt).then((response: ICommentAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    CommentsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        CommentsApi.index(this.jwt).then((response: ICommentAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Comment";
  }

  mounted() {
    CommentsApi.index(this.jwt).then((response: ICommentAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
