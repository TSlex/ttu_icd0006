<template>
  <div v-if="Id && model">
    <h1 class="text-center">Edit</h1>
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
          <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="rankId">Rank (ID)</label>
          <input class="form-control" type="text" required id="rankId" name="rankId" v-model="model.rankId" />
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
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { ProfileRanksApi } from "@/services/admin/ProfileRanksApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";

@Component
export default class ProfileRanksEditA extends Vue {
  @Prop()
  private id!: string;

  private model: IProfileRankAdminDTO | null = null;
  private imageModel: IImageDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  beforeMount() {
    ProfileRanksApi.details(this.Id, this.jwt).then(
      (response: IProfileRankAdminDTO) => {
        this.model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.model) {
      ProfileRanksApi.edit(this.Id, this.model, this.jwt).then(
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
