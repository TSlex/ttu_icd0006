<template>
  <div>
    <h4 class="text-center">{{$t('views.posts.CreateHeader')}}</h4>
    <br />
    <div class="post_create">
      <div class="row d-flex flex-column align-items-center text-center">
        <ImageMiniature :htmlStyle="'width: 20rem !important'" ref="miniature" />
        <div class="col-md-6">
          <ErrorsList :errors="errors" />
          <div class="form-group">
            <label class="control-label" for="postTitle">{{$t('bll.posts.PostTitle')}}*</label>
            <input class="form-control" id="postTitle" v-model="postModel.postTitle" />
          </div>
          <div class="form-group">
            <label class="control-label" for="postDescription">{{$t('bll.posts.PostDescription')}}</label>
            <textarea class="form-control" id="postDescription" v-model="postModel.postDescription" />
          </div>
          <ImageForm :imageModel="imageModel" v-on:file-load="loadImage" />

          <div class="form-group mt-4">
            <button type="submit" class="btn btn-success mr-1" @click="submit">{{$t('views.common.CreateButton')}}</button>
            <button class="btn btn-secondary" @click="goBack">{{$t('views.common.CancelButton')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";
import $ from "jquery";

import ImageComponent from "../../components/Image.vue";

import { ImageType } from "../../types/Enums/ImageType";
import { IPostPostDTO } from "@/types/IPostDTO";
import { IImagePostDTO, IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ImagesApi } from "@/services/ImagesApi";
import ErrorListContainer from "../../components/shared/ErrorListContainer.vue";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";
import { requireError } from "@/translations/validation";

@Component({
  components: {
    ImageForm,
    ImageMiniature,
  },
})
export default class PostsCreate extends ErrorListContainer {
  private imageModel: IImagePostDTO = {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    imageFile: null,
    imageType: ImageType.Post,
    imageFor: "",
    heightPx: 0,
    widthPx: 0,
  };

  private postModel: IPostPostDTO = {
    id: "",
    postTitle: "",
    postDescription: "",
    postImageId: "",
  };

  loadImage(file: File) {
    this.imageModel!.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  goBack(e: Event) {
    router.go(-1);

    e.preventDefault();
  }

  submit() {
    this.errors = [];

    if (!(this.postModel.postTitle.length > 0)) {
      this.errors.push(requireError("bll.posts.PostTitle"));
    }
    if (this.imageModel.imageFile === null) {
      this.errors.push(this.$t("bll.images.ImageRequired").toString());
    }
    if (this.errors.length > 0) return;

    ImagesApi.postImageModel(this.imageModel, this.jwt).then(
      (response: IImageDTO) => {
        this.postModel.id = response.imageFor;
        this.postModel.postImageId = response.id;

        store
          .dispatch("postPost", this.postModel)
          .then((response: ResponseDTO) => {
            if (response.errors) {
              this.errors = response.errors;
            } else {
              router.push(`/profiles/${store.getters.getUserName}`);
            }
          });
      }
    );
  }
}
</script>
