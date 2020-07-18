<template>
  <div v-if="Id && Model">
    <h1 class="text-center">Edit</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
      <div class="col-md-4">
        <ErrorsList :errors="errors"></ErrorsList>

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

import { IRankAdminDTO } from "@/types/IRankDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";

import ErrorsList from "@/views/admin/components/shared/ErrorsList.vue";

@Component({
  components: {
    ErrorsList
  }
})
export default class RanksEditA extends Vue {
  @Prop()
  private id!: string;

  private Model: IRankAdminDTO | null = null;
  private imageModel: IImageDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  beforeMount() {
    RanksApi.details(this.Id, this.jwt).then((response: IRankAdminDTO) => {
      this.Model = response;
    });
  }

  submit() {
    if (this.Id && this.Model) {
      RanksApi.edit(this.Id, this.Model, this.jwt).then(
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
