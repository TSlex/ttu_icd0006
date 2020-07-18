<template>
  <AdminEdit v-if="id && Model" v-on:onSubmit="onSubmit">
    <FormInput id="rankCode" label="Code" :model="Model.rankCode" v-on:onChange="(value) => {Model.rankCode = value}" />

    <FormInput id="rankId" label="Title" :model="Model.id" v-on:onChange="(value) => {Model.id = value}" />

    <FormInput
      id="rankDescription"
      label="Description"
      :model="Model.rankDescription"
      v-on:onChange="(value) => {Model.rankDescription = value}"
    />

    <div class="form-group mt-3">
      <label class="control-label" for="rankIcon">Icons</label>
      <input class="form-control" type="text" required id="rankIcon" name="rankIcon" v-model="Model.rankIcon" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankColor">Color</label>
      <input class="form-control" type="text" required id="rankColor" name="rankColor" v-model="Model.rankColor" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankTextColor">Text color</label>
      <input class="form-control" type="text" required id="rankTextColor" name="rankTextColor" v-model="Model.rankTextColor" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="minExperience">Min experience</label>
      <input class="form-control" type="text" required id="minExperience" name="minExperience" v-model="Model.minExperience" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="maxExperience">Max experience</label>
      <input class="form-control" type="text" required id="maxExperience" name="maxExperience" v-model="Model.maxExperience" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="nextRankId">Next Rank (ID)</label>
      <input class="form-control" type="text" required id="nextRankId" name="nextRankId" v-model="Model.nextRankId" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="previousRankId">Previous Rank (ID)</label>
      <input class="form-control" type="text" id="previousRankId" name="previousRankId" v-model="Model.previousRankId" />
    </div>
  </AdminEdit>
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
import EditControls from "@/views/admin/components/shared/EditControls.vue";
import AdminEdit from "@/views/admin/components/shared/AdminEdit.vue";
import FormInput from "@/components/shared/FormInput.vue";

@Component({
  components: {
    ErrorsList,
    EditControls,
    FormInput,
    AdminEdit
  }
})
export default class RanksEditA extends AdminEdit {
  @Prop() id!: string;

  private Model: IRankAdminDTO | null = null;

  beforeMount() {
    RanksApi.details(this.id, this.jwt).then((response: IRankAdminDTO) => {
      this.Model = response;
    });
  }

  onSubmit() {
    if (this.id && this.Model) {
      RanksApi.edit(this.id, this.Model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
            console.log(this.errors);
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }
}
</script>
