<template>
  <div>
    <h1 class="text-center">Create</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
      <div class="col-md-4">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="profileId">Profile (ID)</label>
          <input class="form-control" type="text" required id="profileId" name="profileId" v-model="Model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="rankId">Rank (ID)</label>
          <input class="form-control" type="text" required id="rankId" name="rankId" v-model="Model.rankId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Save</button>
          <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
        </div>
      </div>
    </div>
  </div>
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
