<template>
  <div>
    <h1>Details</h1>

    <div>
      <h4>Rank</h4>
      <hr />
      <slot></slot>
    </div>
    <DetailsControls v-on:onEdit="$emit('onEdit')" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IdentityStore from "@/components/shared/IdentityStore.vue";

import { RanksApi } from "@/services/RanksApi";
import router from "@/router";

import DetailsControls from "@/views/admin/components/shared/DetailsControls.vue";

@Component({
  components: {
    DetailsControls
  }
})
export default class AdminDetails extends IdentityStore {
  protected id?: string;
  protected modelName?: string;

  onEdit() {
    if (this.modelName && this.id) {
      router.push({ name: `${this.modelName}sEditA`, params: { id: this.id } });
    }
  }
}
</script>
