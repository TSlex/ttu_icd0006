<template>
  <AdminCreateWrapper
    v-if="isLoaded"
    v-on:model-submit="onSubmit"
    v-on:back-to-list="onBackToList"
    :errors="errors"
    :ignoreTopColStyle="true"
  >
    <ImageMiniature :htmlClass="'card mb-4'" :htmlStyle="'width: 20rem !important'" ref="miniature" />
    <div class="col-md-4">
      <ImageForm :imageModel="imageModel" v-on:file-load="loadImage" />
      <CreateEdit :model="model" />
    </div>
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IPostAdminDTO } from "@/types/IPostDTO";

import ImageComponent from "@/components/Image.vue";

import { PostsApi } from "@/services/admin/PostsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { IImagePostDTO, IImageAdminDTO } from "@/types/IImageDTO";
import { ImageType } from "@/types/Enums/ImageType";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "@/helpers/guid";
import { ImagesApi } from "@/services/admin/ImagesApi";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";
import { isGuid, requireError } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
    ImageForm,
    ImageMiniature,
  },
})
export default class PostsCreateA extends AdminCreate {
  private imageModel: IImagePostDTO = {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    imageFile: null,
    imageType: ImageType.Post,
    imageFor: createEmptyGuid(),
    heightPx: 0,
    widthPx: 0,
  };

  private model: IPostAdminDTO = {
    id: createEmptyGuid(),
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    postTitle: "",
    postImageId: "",
    postDescription: "",
    postPublicationDateTime: new Date(),
    postFavoritesCount: 0,
    postCommentsCount: 0,
    profileId: "",
  };

  loadImage(file: File) {
    this.imageModel.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.posts.ProfileId"));
    }
    if (!this.model!.postTitle) {
      this.errors.push(requireError("bll.posts.PostTitle"));
    }
    if (!this.model!.postPublicationDateTime) {
      this.errors.push(requireError("bll.posts.PostPublicationDateTime"));
    }
    if (this.imageModel.imageFile === null) {
      this.errors.push(this.$t("bll.images.ImageRequired").toString());
    }
    if (this.errors.length > 0) return;

    ImagesApi.create(this.imageModel! as IImageAdminDTO, this.jwt).then(
      (response: IImageAdminDTO) => {
        this.model.id = response.imageFor!;
        this.model.postImageId = response.id!;

        PostsApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        });
      }
    );
  }

  created() {
    this.modelName = "Post";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
