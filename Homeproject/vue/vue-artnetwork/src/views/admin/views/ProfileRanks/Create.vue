<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IProfileRankAdminDTO } from "@/types/IProfileRankDTO";

import ImageComponent from "@/components/Image.vue";

import { ProfileRanksApi } from "@/services/admin/ProfileRanksApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "../../../../helpers/guid";
import { isGuid, requireError } from "@/translations/validation";

@Component({
  components: {
    ImageComponent,
    CreateEdit,
  },
})
export default class ProfileRanksCreateA extends AdminCreate {
  private model: IProfileRankAdminDTO = {
    id: createEmptyGuid(),
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    profileId: "",
    rankId: "",
  };

  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.profileranks.ProfileId"));
    }
    if (!isGuid(this.model!.rankId)) {
      this.errors.push(requireError("bll.profileranks.RankId"));
    }
    if (this.errors.length > 0) return;

    ProfileRanksApi.create(this.model, this.jwt).then(
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
    this.modelName = "ProfileRank";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
