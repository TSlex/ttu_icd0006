<template>
  <AdminEditWrapper
    v-if="isLoaded"
    v-on:model-submit="onSubmit"
    v-on:back-to-list="onBackToList"
    :errors="errors"
    :ignoreTopColStyle="true"
  >
    <ImageMiniature :initialId="model.id" :htmlClass="'card mb-4'" :htmlStyle="'width: 30rem !important'" ref="miniature" />
    <div class="col-md-6">
      <ImageForm :imageModel="model" v-on:file-load="loadImage" />

      <div class="form-group">
        <label class="control-label" for="imageUrl">{{$t('bll.images.ImageUrl')}}*</label>
        <input class="form-control" type="text" id="imageUrl" maxlength="300" name="imageUrl" v-model="model.imageUrl" />
      </div>

      <div class="form-group">
        <label class="control-label" for="originalImageUrl">{{$t('bll.images.OriginalImageUrl')}}*</label>
        <input
          class="form-control"
          type="text"
          id="originalImageUrl"
          maxlength="300"
          name="originalImageUrl"
          v-model="model.originalImageUrl"
        />
      </div>

      <CreateEdit :model="model" />
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IImageAdminDTO } from "@/types/IImageDTO";

import ImageComponent from "@/components/Image.vue";

import { ImagesApi } from "@/services/admin/ImagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

import CreateEdit from "./CreateEdit.vue";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";
import { requireError, isGuid } from "@/translations/validation";

@Component({
  components: {
    ImageForm,
    ImageMiniature,
    CreateEdit,
  },
})
export default class ImagesEditA extends AdminEdit<IImageAdminDTO> {
  loadImage(file: File) {
    this.model!.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  onSubmit() {
    this.errors = [];

    if (!(this.model!.imageUrl!.length > 0)) {
      this.errors.push(requireError("bll.images.ImageUrl"));
    }
    if (!(this.model!.originalImageUrl!.length > 0)) {
      this.errors.push(requireError("bll.images.OriginalImageUrl"));
    }
    if (
      Number(this.model!.imageType) !== ImageType.Undefined &&
      !isGuid(this.model!.imageFor!)
    ) {
      this.errors.push(requireError("bll.images.ImageFor"));
    }
    if (this.errors.length > 0) return;

    ImagesApi.edit(this.Id, this.model!, this.jwt).then((response: any) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
  }

  created() {
    this.modelName = "Image";
  }

  mounted() {
    ImagesApi.details(this.Id, this.jwt).then((response: IImageAdminDTO) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
