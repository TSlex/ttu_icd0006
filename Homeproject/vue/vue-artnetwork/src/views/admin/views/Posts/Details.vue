<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.posts.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>
    </dl>
    <hr />
    <div style="width: 20rem;">
      <ImageComponent :id="model.postImageId" :key="model.giftImageId" htmlClass="card-img" height="inherit" width="inherit" />
    </div>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.posts.PostTitle')}}</dt>
      <dd class="col-sm-10">{{model.postTitle}}</dd>

      <dt class="col-sm-2">{{$t('bll.posts.PostDescription')}}</dt>
      <dd class="col-sm-10">{{model.postDescription}}</dd>

      <dt class="col-sm-2">{{$t('bll.posts.PostPublicationDateTime')}}</dt>
      <dd class="col-sm-10">{{model.postPublicationDateTime | formatDate}}</dd>

      <dt class="col-sm-2">{{$t('bll.posts.PostFavoritesCount')}}</dt>
      <dd class="col-sm-10">{{model.postFavoritesCount}}</dd>

      <dt class="col-sm-2">{{$t('bll.posts.PostCommentsCount')}}</dt>
      <dd class="col-sm-10">{{model.postCommentsCount}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IPostAdminDTO } from "@/types/IPostDTO";

import { PostsApi } from "@/services/admin/PostsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class PostsDetailsA extends AdminDetails<IPostAdminDTO> {
  created() {
    this.modelName = "Post";
  }

  mounted() {
    PostsApi.details(this.Id, this.jwt).then((response: IPostAdminDTO) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
