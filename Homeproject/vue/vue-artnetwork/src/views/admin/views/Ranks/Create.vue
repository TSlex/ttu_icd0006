<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="Model" />
  </AdminCreateWrapper>
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

@Component({
  components: {
    CreateEdit,
  },
})
export default class RanksCreateA extends AdminCreate<IRankAdminDTO> {
  private Model: IRankAdminDTO = {
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
    // if (
    //   this.Model.rankCode.length > 0 &&
    //   this.Model.rankTitle!.length > 0 &&
    //   this.Model.rankColor.length > 0 &&
    //   this.Model.rankTextColor.length > 0 &&
    //   Number(this.Model.minExperience) < Number(this.Model.maxExperience)
    // ) {
    RanksApi.create(this.Model, this.jwt).then((response: ResponseDTO) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
    // }
  }

  created() {
    this.modelName = "Rank";
  }
}
</script>
