<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:view-edit="onEdit" v-on:back-to-list="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.comments.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.comments.PostId')}}</dt>
      <dd class="col-sm-10">{{model.postId}}</dd>
    </dl>
    <hr />
    <ImageComponent
      :id="model.postId"
      :loadPost="true"
      height="unset"
      width="unset"
      htmlClass="card-img"
      htmlParentStyle="width: 20rem;"
    />
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.comments.CommentValue')}}</dt>
      <dd class="col-sm-10">{{model.commentValue}}</dd>

      <dt class="col-sm-2">{{$t('bll.comments.CommentDateTime')}}</dt>
      <dd class="col-sm-10">{{model.commentDateTime | formatDate}}</dd>
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

import { ICommentAdminDTO } from "@/types/ICommentDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class CommentsDetailsA extends AdminDetails<ICommentAdminDTO> {
  created() {
    this.modelName = "Comment";
  }

  mounted() {
    CommentsApi.details(this.Id, this.jwt).then(
      (response: ICommentAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
