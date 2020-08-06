<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IRankAdminDTO } from "@/types/IRankDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "@/helpers/guid";

import AdminCreate from "../../components/shared/base/AdminCreate.vue";
import { isGuid, requireError, isHex } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class RanksCreateA extends AdminCreate {
  private model: IRankAdminDTO = {
    id: createEmptyGuid(),
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    rankCode: "",
    rankTitleId: createEmptyGuid(),
    rankTitle: "",
    rankDescriptionId: null,
    rankDescription: "",
    rankColor: "",
    rankTextColor: "",
    rankIcon: null,
    maxExperience: 0,
    minExperience: 0,
    previousRankId: null,
    nextRankId: null,
  };

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

    RanksApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
  }

  created() {
    this.modelName = "Rank";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
