<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IRankAdminDTO } from "@/types/IRankDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";

import AdminEdit from "@/views/admin/components/shared/base/AdminEdit.vue";
import FormInput from "@/components/shared/FormInput.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    FormInput,
    CreateEdit,
  },
})
export default class RanksEditA extends AdminEdit<IRankAdminDTO> {
  onSubmit() {
    if (this.id && this.model) {
      RanksApi.edit(this.id, this.model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }

  beforeMount() {
    RanksApi.details(this.id, this.jwt).then((response: IRankAdminDTO) => {
      this.model = response;
    });
  }

  created() {
    this.modelName = "Rank";
  }
}
</script>
