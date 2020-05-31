<template>
  <div class="d-flex" v-if="Model">
    <button class="btn btn-info fa fa-history index_controls" v-if="IsOriginalRecord"></button>
    <button class="btn btn-primary fa fa-edit index_controls"></button>
    <button class="btn btn-primary fa fa-eye index_controls"></button>
    <button class="btn btn-danger fa fa-trash index_controls" v-if="!IsDeleted"></button>
    <button class="btn btn-success fa fa-trash-restore index_controls" v-else></button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DomainEntityBaseMetaSoftDelete as BaseSoftDelete } from "@/types/Domain/DomainEntityBaseMetaSoftDelete";
import { DomainEntityBaseMetaSoftUpdateDelete as BaseSoftUpdate } from "@/types/Domain/DomainEntityBaseMetaSoftUpdateDelete";
import { DomainEntityBaseMetadata as Base } from "@/types/Domain/DomainEntityBaseMetadata";

@Component
export default class IndexControls extends Vue {
  @Prop()
  private model!: Base | BaseSoftDelete | BaseSoftUpdate;

  get Model() {
    return this.model;
  }

  get IsOriginalRecord() {
    return !!(this.Model as BaseSoftUpdate).masterId;
  }

  get IsDeleted() {
    return this.Model.deletedAt != null;
  }
}
</script>
