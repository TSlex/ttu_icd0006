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
import { requireError, isHex } from "@/translations/validation";

@Component({
  components: {
    FormInput,
    CreateEdit,
  },
})
export default class RanksEditA extends AdminEdit<IRankAdminDTO> {
  onSubmit() {
    this.errors = [];

    if (!this.model!.rankCode) {
      this.errors.push(requireError("bll.ranks.RankCode"));
    }
    if (!this.model!.rankTitle) {
      this.errors.push(requireError("bll.ranks.RankTitle"));
    }
    if (!this.model!.rankDescription) {
      this.errors.push(requireError("bll.ranks.RankDescription"));
    }
    if (!isHex(this.model!.rankColor)) {
      this.errors.push(requireError("bll.ranks.RankColor"));
    }
    if (!isHex(this.model!.rankTextColor)) {
      this.errors.push(requireError("bll.ranks.RankTextColor"));
    }
    if (this.model!.maxExperience <= this.model!.minExperience) {
      this.errors.push(requireError("bll.ranks.MaxExperience"));
    }
    if (this.errors.length > 0) return;
    RanksApi.edit(this.id, this.model!, this.jwt).then(
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
    RanksApi.details(this.id, this.jwt).then((response: IRankAdminDTO) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  created() {
    this.modelName = "Rank";
  }
}
</script>
