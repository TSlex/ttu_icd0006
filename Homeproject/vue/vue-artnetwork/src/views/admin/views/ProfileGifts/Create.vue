<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IProfileGiftAdminDTO, IProfileGiftDTO } from "@/types/IProfileGiftDTO";

import ImageComponent from "@/components/Image.vue";

import { ProfileGiftsApi } from "@/services/admin/ProfileGiftsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "@/helpers/guid";

@Component({
  components: {
    ImageComponent,
    CreateEdit,
  },
})
export default class ProfileGiftsCreateA extends AdminCreate {
  private model: IProfileGiftAdminDTO = {
    id: createEmptyGuid(),
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    profileId: "",
    giftId: "",
    giftDateTime: new Date(),
    price: 0,
    fromProfileId: null,
    message: "",
  };

  onSubmit() {
    ProfileGiftsApi.create(this.model, this.jwt).then(
      (response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      }
    );
  }

  beforeDestroy() {
    let exist = document.getElementById("image_miniature_script");

    if (exist) {
      exist.remove();
    }
  }

  created() {
    this.modelName = "ProfileGift";
  }
}
</script>
