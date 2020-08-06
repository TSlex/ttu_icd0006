<template>
  <AdminEditWrapper
    v-if="isLoaded"
    v-on:model-submit="onSubmit"
    v-on:back-to-list="onBackToList"
    :errors="errors"
    :ignoreTopColStyle="true"
  >
    <ImageMiniature
      :initialId="model.postImageId"
      :htmlClass="'card mb-4'"
      :htmlStyle="'width: 20rem !important'"
      ref="miniature"
    />
    <div class="col-md-4">
      <ImageForm :imageModel="imageModel" v-on:file-load="loadImage" />
      <CreateEdit :model="model" />
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IPostAdminDTO } from "@/types/IPostDTO";
import { IImageDTO, IImageAdminDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import ImageComponent from "@/components/Image.vue";

import { PostsApi } from "@/services/admin/PostsApi";
import { ImageType } from "@/types/Enums/ImageType";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "@/helpers/guid";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";
import { isGuid, requireError } from "@/translations/validation";
import { ImagesApi } from "@/services/admin/ImagesApi";

@Component({
  components: {
    CreateEdit,
    ImageForm,
    ImageMiniature,
  },
})
export default class PostsEditA extends AdminEdit<IPostAdminDTO> {
  private imageModel: IImageAdminDTO | null = null;

  loadImage(file: File) {
    this.imageModel!.imageFile = file;
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

    if (this.errors.length > 0) return;
    ImagesApi.edit(this.imageModel!.id, this.imageModel!, this.jwt).then(() => {
      PostsApi.edit(this.Id, this.model!, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
    });
  }

  created() {
    this.modelName = "Post";
  }

  beforeMount() {
    PostsApi.details(this.Id, this.jwt).then((response: IPostAdminDTO) => {
      this.model = response;
      ImagesApi.details(response.postImageId!, this.jwt).then(
        (response: IImageAdminDTO) => {
          this.imageModel = response;
          this.isLoaded = true;
        }
      );
    });
  }
}
</script>
