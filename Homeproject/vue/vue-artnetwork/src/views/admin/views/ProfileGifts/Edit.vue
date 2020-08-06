<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IProfileGiftAdminDTO } from "@/types/IProfileGiftDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import ImageComponent from "@/components/Image.vue";

import { ProfileGiftsApi } from "@/services/admin/ProfileGiftsApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";
import CreateEdit from "./CreateEdit.vue";
import { isGuid, requireError } from "@/translations/validation";

@Component({
  components: {
    ImageComponent,
    CreateEdit,
  },
})
export default class ProfileGiftsEditA extends AdminEdit<IProfileGiftAdminDTO> {
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

    ProfileGiftsApi.edit(this.Id, this.model!, this.jwt).then(
      (response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      }
    );
  }

  beforeMount() {
    ProfileGiftsApi.details(this.Id, this.jwt).then(
      (response: IProfileGiftAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }

  created() {
    this.modelName = "ProfileGift";
  }
}
</script>
