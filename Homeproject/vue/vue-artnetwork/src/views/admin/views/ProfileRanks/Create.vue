<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group mt-3">
      <label class="control-label" for="profileId">Profile (ID)</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="Model.profileId" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankId">Rank (ID)</label>
      <input class="form-control" type="text" required id="rankId" name="rankId" v-model="Model.rankId" />
    </div>
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
  },
})
export default class ProfileRanksCreateA extends AdminCreate {
  private Model: IProfileRankAdminDTO = {
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

  submit() {
    if (this.Model.profileId.length > 0 && this.Model.rankId.length > 0) {
      ProfileRanksApi.create(this.Model, this.jwt).then(
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
