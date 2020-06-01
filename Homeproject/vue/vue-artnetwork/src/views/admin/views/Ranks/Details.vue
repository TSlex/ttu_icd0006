<template>
  <div v-if="Id && Model">
    <h1>Details</h1>

    <div>
      <h4>Rank</h4>
      <hr />
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
    </div>
    <div>
      <button class="btn btn-primary mr-1" @click="onEdit(Model.id)">Edit</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IRankAdminDTO } from "@/types/IRankDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class RanksDetailsA extends Vue {
  @Prop()
  private id!: string;

  private Model: IRankAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  onEdit(id: string) {
    router.push({ name: "RanksEditA", params: { id } });
  }

  mounted() {
    RanksApi.details(this.Id, this.jwt).then((response: IRankAdminDTO) => {
      this.Model = response;
    });
  }
}
</script>
