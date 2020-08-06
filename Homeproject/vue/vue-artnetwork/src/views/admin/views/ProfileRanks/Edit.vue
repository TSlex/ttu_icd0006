<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IProfileRankAdminDTO } from "@/types/IProfileRankDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { ProfileRanksApi } from "@/services/admin/ProfileRanksApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";

import CreateEdit from "./CreateEdit.vue";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";
import { requireError, isGuid } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class ProfileRanksEditA extends AdminEdit<IProfileRankAdminDTO> {
  beforeMount() {
    ProfileRanksApi.details(this.Id, this.jwt).then(
      (response: IProfileRankAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }

  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.profileranks.ProfileId"));
    }
    if (!isGuid(this.model!.rankId)) {
      this.errors.push(requireError("bll.profileranks.RankId"));
    }
    if (this.errors.length > 0) return;

    ProfileRanksApi.edit(this.Id, this.model!, this.jwt).then(
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
}
</script>
