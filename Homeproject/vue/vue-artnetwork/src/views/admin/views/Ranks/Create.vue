<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
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
}
</script>
