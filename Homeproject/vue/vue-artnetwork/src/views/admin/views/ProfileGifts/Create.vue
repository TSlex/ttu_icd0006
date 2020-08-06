<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
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
import { isGuid, requireError } from "@/translations/validation";

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
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.profilegifts.ProfileId"));
    }
    if (!isGuid(this.model!.giftId)) {
      this.errors.push(requireError("bll.profilegifts.GiftId"));
    }
    if (!this.model!.giftDateTime) {
      this.errors.push(requireError("bll.profilegifts.GiftDateTime"));
    }
    if (this.errors.length > 0) return;

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

  created() {
    this.modelName = "ProfileGift";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
