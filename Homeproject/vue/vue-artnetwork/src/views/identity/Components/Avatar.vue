<template>
  <div v-if="isLoaded">
    <h4 class>{{$t('views.identity.AvatarHeader')}}</h4>

    <div class="row d-flex flex-column align-items-center text-center mt-2">
      <ImageMiniature :initialId="imageModel.id" :htmlStyle="'width: 20rem !important'" ref="miniature" />

      <div class="col-md-8">
        <ErrorsList :errors="errors" />

        <ImageForm :imageModel="imageModel" v-on:onLoadFile="loadImage" />

        <div class="form-group mt-2">
          <button type="onSubmit" class="btn btn-success mt-2" @click="onSubmit">{{$t('views.common.SaveButton')}}</button>
        </div>
      </div>
    </div>
  </div>
  <LoadingOverlay v-else :fixed="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { IProfileDTO } from "../../../types/IProfileDTO";
import { ProfilesApi } from "../../../services/ProfilesApi";
import {
  IImageDTO,
  IImagePostDTO,
  IImagePutDTO,
} from "../../../types/IImageDTO";
import { ImagesApi } from "../../../services/ImagesApi";
import { ImageType } from "../../../types/Enums/ImageType";
import $ from "jquery";
import { PostsApi } from "../../../services/PostsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import IdentityStore from "../../../components/shared/IdentityStore.vue";
import ErrorListContainer from "../../../components/shared/ErrorListContainer.vue";
import { createEmptyGuid } from "../../../helpers/guid";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";

@Component({
  components: {
    ImageForm,
    ImageMiniature,
  },
})
export default class Avatar extends ErrorListContainer {
  private imageModel: IImageDTO | null = null;
  private profile: IProfileDTO | null = null;

  get isAvatarExist() {
    return this.profile?.profileAvatarId != null;
  }

  loadImage(file: File) {
    this.imageModel!.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  beforeMount() {
    ProfilesApi.getProfile(this.userName, this.jwt).then(
      (response: IProfileDTO) => {
        this.profile = response;
        if (this.isAvatarExist) {
          ImagesApi.getImageModel(this.profile!.profileAvatarId, this.jwt).then(
            (response: IImageDTO) => {
              this.imageModel = response;
              this.isLoaded = true;
            }
          );
        } else {
          this.imageModel = {
            id: createEmptyGuid(),
            imageUrl: "",
            originalImageUrl: "",
            heightPx: 0,
            widthPx: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            imageFile: null,
            imageType: ImageType.ProfileAvatar,
            imageFor: "",
          };

          this.isLoaded = true;
        }
      }
    );
  }

  onSubmit() {
    if (!this.isAvatarExist && this.imageModel) {
      let postModel: IImagePostDTO = {
        heightPx: this.imageModel.heightPx,
        widthPx: this.imageModel.widthPx,
        paddingTop: this.imageModel.paddingTop,
        paddingRight: this.imageModel.paddingRight,
        paddingBottom: this.imageModel.paddingBottom,
        paddingLeft: this.imageModel.paddingLeft,
        imageFile: this.imageModel.imageFile,
        imageType: ImageType.ProfileAvatar,
        imageFor: "",
      };

      ImagesApi.postImageModel(
        postModel,
        this.jwt
      ).then((response: IImageDTO) => {});
    } else if (this.isAvatarExist && this.imageModel) {
      let putModel: IImagePutDTO = {
        id: this.imageModel.id,
        heightPx: this.imageModel.heightPx,
        widthPx: this.imageModel.widthPx,
        paddingTop: this.imageModel.paddingTop,
        paddingRight: this.imageModel.paddingRight,
        paddingBottom: this.imageModel.paddingBottom,
        paddingLeft: this.imageModel.paddingLeft,
        imageFile: this.imageModel.imageFile,
      };

      ImagesApi.putImageModel(this.imageModel.id, putModel, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response?.errors) {
            this.$swal({
              icon: "success",
              title: this.$t("views.identity.AvatarUpdateStatusSuccess"),
              showConfirmButton: true,
            });
          }
        }
      );
    }
  }
}
</script>
