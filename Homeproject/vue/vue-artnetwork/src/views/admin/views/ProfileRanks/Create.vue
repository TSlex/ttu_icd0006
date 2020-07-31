<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit />
  </AdminCreateWrapper>
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

@Component({
  components: {
    ImageComponent,
    CreateEdit,
  },
})
export default class ProfileRanksCreateA extends AdminCreate {
  private model: IProfileRankAdminDTO = {
    id: "",
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    profileId: "",
    rankId: "",
  };

  private isImageLoaded: boolean = false;

  get jwt() {
    return store.getters.getJwt;
  }

  onSubmit() {
    if (this.model.profileId.length > 0 && this.model.rankId.length > 0) {
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
  }
}
</script>
