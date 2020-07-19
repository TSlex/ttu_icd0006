<template>
  <AdminDetails v-if="Id && Model" v-on:onEdit="onEdit">
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{Model.id}}</dd>

      <dt class="col-sm-2">Previous rank (ID)</dt>
      <dd class="col-sm-10">{{Model.previousRankId}}</dd>

      <dt class="col-sm-2">Next rank (ID)</dt>
      <dd class="col-sm-10">{{Model.nextRankId}}</dd>

      <dt class="col-sm-2">Title</dt>
      <dd class="col-sm-10">{{Model.rankTitle}}</dd>

      <dt class="col-sm-2">Description</dt>
      <dd class="col-sm-10">{{Model.rankDescription}}</dd>

      <dt class="col-sm-2">Icons</dt>
      <dd class="col-sm-10">{{Model.rankIcon}}</dd>

      <dt class="col-sm-2">Color</dt>
      <dd class="col-sm-10">{{Model.rankTextColor}}</dd>

      <dt class="col-sm-2">Background color</dt>
      <dd class="col-sm-10">{{Model.rankColor}}</dd>

      <dt class="col-sm-2">Min experience</dt>
      <dd class="col-sm-10">{{Model.minExperience}}</dd>

      <dt class="col-sm-2">Max experience</dt>
      <dd class="col-sm-10">{{Model.maxExperience}}</dd>

      <dt class="col-sm-2">CreatedBy</dt>
      <dd class="col-sm-10">{{Model.createdBy}}</dd>

      <dt class="col-sm-2">CreatedAt</dt>
      <dd class="col-sm-10">{{Model.createdAt}}</dd>

      <dt class="col-sm-2">ChangedBy</dt>
      <dd class="col-sm-10">{{Model.changedBy}}</dd>

      <dt class="col-sm-2">ChangedAt</dt>
      <dd class="col-sm-10">{{Model.changedAt}}</dd>

      <dt class="col-sm-2">DeletedBy</dt>
      <dd class="col-sm-10">{{Model.deletedBy}}</dd>

      <dt class="col-sm-2">DeletedAt</dt>
      <dd class="col-sm-10">{{Model.deletedAt}}</dd>
    </dl>
  </AdminDetails>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IRankAdminDTO } from "@/types/IRankDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminDetails from "@/views/admin/components/shared/AdminDetails.vue";

@Component({
  components: {
    AdminDetails
  }
})
export default class RanksDetailsA extends AdminDetails {
  @Prop() protected id!: string;

  private Model: IRankAdminDTO | null = null;

  get Id() {
    return this.id;
  }

  created() {
    this.modelName = "Rank";
  }

  mounted() {
    RanksApi.details(this.Id, this.jwt).then((response: IRankAdminDTO) => {
      this.Model = response;
    });
  }
}
</script>
