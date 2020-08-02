<template>
  <AdminCreateWrapper
    v-if="isLoaded"
    v-on:onSubmit="onSubmit"
    v-on:onBackToList="onBackToList"
    :errors="errors"
    :ignoreTopColStyle="true"
  >
    <ImageMiniature :htmlClass="'card mb-4'" :htmlStyle="'width: 30rem !important'" ref="miniature" />
    <div class="col-md-4">
      <ImageForm :imageModel="model" v-on:onLoadFile="loadImage" />
      <CreateEdit :model="model" />
    </div>
  </AdminCreateWrapper>
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

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "../../../../helpers/guid";

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
export default class ImagesCreateA extends AdminCreate {
  private model: IImageAdminDTO = {
    id: createEmptyGuid(),
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    imageUrl: "",
    originalImageUrl: "",
    heightPx: 0,
    widthPx: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    imageFile: null,
    imageType: ImageType.Undefined,
    imageFor: "",
  };

  loadImage(file: File) {
    this.model!.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  onSubmit() {
    this.errors = [];

    if (
      Number(this.model.imageType) !== ImageType.Undefined &&
      !isGuid(this.model.imageFor!)
    ) {
      this.errors.push(requireError("bll.images.ImageFor"));
    }
    if (this.model.imageFile === null) {
      this.errors.push(this.$t("bll.images.ImageRequired").toString());
    }
    if (this.errors.length > 0) return;

    ImagesApi.create(this.model, this.jwt).then((response: any) => {
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
    this.isLoaded = true;
  }
}
</script>
