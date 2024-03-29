<template>
  <div style="position: relative; min-height: 400px">
    <div v-if="isLoaded" class="row d-flex flex-column align-items-center text-center mt-2">
      <ImageMiniature :initialId="Id" :htmlStyle="'width: 20rem !important'" ref="miniature" />

      <div class="col mt-2">
        <ImageForm :imageModel="imageModel" v-on:file-load="loadImage" />

        <div class="form-group mt-2">
          <button type="submit" class="btn btn-success mt-2" @click="submit">{{$t('views.common.SaveButton')}}</button>
        </div>
      </div>
    </div>
    <LoadingOverlay v-else :fixed="false" />
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ImageType } from "../../types/Enums/ImageType";

import { IImagePutDTO, IImageDTO } from "@/types/IImageDTO";

import store from "@/store";

import { ImagesApi } from "@/services/ImagesApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";

import EventBus from "@/events/EventBus";
import IdentityStore from "../../components/shared/IdentityStore.vue";

@Component({
  components: {
    ImageForm,
    ImageMiniature,
  },
})
export default class PostsEditImage extends IdentityStore {
  @Prop()
  private id!: string;

  private imageModel: IImagePutDTO = {
    id: "",
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    heightPx: 0,
    widthPx: 0,
    imageFile: null,
  };

  get Id() {
    return this.id;
  }

  loadImage(file: File) {
    this.imageModel.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  beforeMount() {
    ImagesApi.getImageModel(this.Id, this.jwt).then(
      (response: IImagePutDTO) => {
        this.imageModel = response;
        this.isLoaded = true;
      }
    );
  }

  submit() {
    store
      .dispatch("putImageModel", { ...this.imageModel })
      .then((response: ResponseDTO) => {
        if (!response?.errors) {
          this.$swal({
            icon: "success",
            title: this.$t("views.common.Success"),
            showConfirmButton: true,
          }).then(() => {
            this.$emit("modal-close");
          });
        }
      });
  }
}
</script>
