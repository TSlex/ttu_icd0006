<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
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

@Component({
  components: {
    ImageComponent,
    CreateEdit,
  },
})
export default class ProfileGiftsEditA extends AdminEdit<IProfileGiftAdminDTO> {
  onSubmit() {
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
