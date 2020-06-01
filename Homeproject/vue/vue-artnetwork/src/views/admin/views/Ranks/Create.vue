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
          <label class="control-label" for="rankCode">Code</label>
          <input class="form-control" type="text" required id="rankCode" name="rankCode" v-model="Model.rankCode" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="string">Title</label>
          <input class="form-control" type="text" required id="string" name="string" v-model="Model.string" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="rankDescription">Description</label>
          <input class="form-control" type="text" required id="profileId" name="rankDescription" v-model="Model.rankDescription" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="rankIcon">Icons</label>
          <input class="form-control" type="text" required id="rankIcon" name="rankIcon" v-model="Model.rankIcon" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="rankColor">Color</label>
          <input class="form-control" type="text" required id="rankColor" name="rankColor" v-model="Model.rankColor" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="rankTextColor">Text color</label>
          <input class="form-control" type="text" required id="rankTextColor" name="rankTextColor" v-model="Model.rankTextColor" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="minExperience">Min experience</label>
          <input class="form-control" type="text" required id="minExperience" name="minExperience" v-model="Model.minExperience" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="maxExperience">Max experience</label>
          <input class="form-control" type="text" required id="maxExperience" name="maxExperience" v-model="Model.maxExperience" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="nextRankId">Next Rank (ID)</label>
          <input class="form-control" type="text" required id="nextRankId" name="nextRankId" v-model="Model.nextRankId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group mt-3">
          <label class="control-label" for="previousRankId">Previous Rank (ID)</label>
          <input
            class="form-control"
            type="text"
            required
            id="previousRankId"
            name="previousRankId"
            v-model="Model.previousRankId"
          />
          <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Submit</button>
          <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IRankAdminDTO } from "@/types/IRankDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";

@Component
export default class RanksCreateA extends Vue {
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

  private isImageLoaded: boolean = false;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  submit() {
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
