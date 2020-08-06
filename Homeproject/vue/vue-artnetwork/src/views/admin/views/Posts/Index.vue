<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:view-create="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.common.Id')}}</th>
          <th>{{$t('views.images.Preview')}}</th>
          <th>{{$t('bll.posts.PostTitle')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.id}}</td>
          <td>
            <ImageComponent
              :id="item.postImageId"
              htmlParentStyle="width: 5rem"
              height="unset"
              width="unset"
              htmlClass="card-img"
            />
          </td>
          <td>{{item.postTitle}}</td>
          <td>
            <IndexControls
              :model="item"
              v-on:view-edit="onEdit(item.id)"
              v-on:view-details="onDetails(item.id)"
              v-on:view-delete="onDelete(item.id)"
              v-on:view-restore="onRestore(item.id)"
              v-on:view-history="onHistory(item.id)"
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

import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    IndexControls,
    ImageComponent,
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
      this.isLoaded = true;
    });
  }
}
</script>
