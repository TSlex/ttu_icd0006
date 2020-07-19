<template>
  <AdminCreate v-on:onSubmit="onSubmit">
    <CreateEdit :model="Model" />
  </AdminCreate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IRankAdminDTO } from "@/types/IRankDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";

import AdminCreate from "@/views/admin/components/shared/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    AdminCreate,
    CreateEdit
  }
})
export default class RanksCreateA extends AdminCreate {
  private Model: IRankAdminDTO = {
    id: "",
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    rankCode: "",
    rankTitleId: "",
    rankTitle: "",
    rankDescriptionId: null,
    rankDescription: "",
    rankColor: "",
    rankTextColor: "",
    rankIcon: null,
    maxExperience: 0,
    minExperience: 0,
    previousRankId: null,
    nextRankId: null
  };

  onSubmit() {
    console.log(this.Model);
    if (
      this.Model.rankCode.length > 0 &&
      this.Model.rankTitle!.length > 0 &&
      this.Model.rankColor.length > 0 &&
      this.Model.rankTextColor.length > 0 &&
      this.Model.minExperience < this.Model.maxExperience
    ) {
      RanksApi.create(this.Model, this.jwt).then((response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      });
    }
  }
}
</script>
