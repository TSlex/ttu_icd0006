<template>
  <AdminEditWrapper
    v-if="isLoaded"
    v-on:model-submit="onSubmit"
    v-on:back-to-list="onBackToList"
    :errors="errors"
    :ignoreTopColStyle="true"
  >
    <ImageMiniature
      :initialId="model.giftImageId"
      :htmlClass="'card mb-4'"
      :htmlStyle="'width: 30rem !important'"
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

import { IGiftAdminDTO } from "@/types/IGiftDTO";
import { IImageDTO, IImageAdminDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import ImageComponent from "@/components/Image.vue";

import { GiftsApi } from "@/services/admin/GiftsApi";
import { ImageType } from "@/types/Enums/ImageType";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";
import { createEmptyGuid } from "../../../../helpers/guid";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";

import CreateEdit from "./CreateEdit.vue";
import { requireError } from "@/translations/validation";
import { ImagesApi } from "@/services/admin/ImagesApi";

@Component({
  components: {
    CreateEdit,
    ImageForm,
    ImageMiniature,
  },
})
export default class GiftsEditA extends AdminEdit<IGiftAdminDTO> {
  private imageModel: IImageAdminDTO | null = null;

  get isImageExist() {
    return this.model?.giftImageId != null;
  }

  loadImage(file: File) {
    this.imageModel!.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  onSubmit() {
    this.errors = [];

    if (!(this.model!.giftCode.length > 0)) {
      this.errors.push(requireError("bll.gifts.GiftCode"));
    }
    if (!(this.model!.giftName.length > 0)) {
      this.errors.push(requireError("bll.gifts.GiftName"));
    }
    if (this.model!.price < 0) {
      this.errors.push(requireError("bll.gifts.Price"));
    }
    if (this.errors.length > 0) return;

    ImagesApi.edit(this.imageModel!.id, this.imageModel!, this.jwt).then(() => {
      GiftsApi.edit(this.Id, this.model!, this.jwt).then(
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
    this.modelName = "Gift";
  }

  beforeMount() {
    GiftsApi.details(this.Id, this.jwt).then((response: IGiftAdminDTO) => {
      this.model = response;
      if (this.isImageExist) {
        ImagesApi.details(response.giftImageId!, this.jwt).then(
          (response: IImageAdminDTO) => {
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
          masterId: null,
          createdBy: "",
          createdAt: new Date(),
          changedBy: "",
          changedAt: new Date(),
          deletedBy: null,
          deletedAt: null,
        };

        this.isLoaded = true;
      }
    });
  }
}
</script>
