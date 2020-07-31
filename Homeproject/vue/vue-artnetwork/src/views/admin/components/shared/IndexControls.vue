<template>
  <div class="d-flex justify-content-end" v-if="Model">
    <button class="btn btn-info fa fa-history index_controls" v-if="IsMasterRecord" @click="$emit('onHistory')"></button>
    <button class="btn btn-primary fa fa-edit index_controls" v-if="!IsHistoryRecord" @click="$emit('onEdit')"></button>
    <button class="btn btn-primary fa fa-eye index_controls" @click="$emit('onDetails')"></button>
    <button class="btn btn-danger fa fa-trash index_controls" v-if="!IsHistoryRecord && !IsDeleted" @click="$emit('onDelete')"></button>
    <button
      class="btn btn-success fa fa-trash-restore index_controls"
      v-if="!IsHistoryRecord && IsDeleted"
      @click="$emit('onRestore')"
    ></button>
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

  get IsHistoryRecord() {
    if (
      (this.Model as BaseSoftUpdate).masterId &&
      (this.Model as BaseSoftUpdate).masterId !== null
    ) {
      return true;
    }
    return false;
  }

  get IsMasterRecord() {
    if ((this.Model as BaseSoftUpdate).masterId === null) {
      return true;
    }
    return false;
  }

  get IsDeleted() {
    return this.Model.deletedAt != null;
  }
}
</script>
