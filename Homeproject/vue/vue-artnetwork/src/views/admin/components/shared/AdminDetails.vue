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

import store from "@/store";
import router from "@/router";
import { RanksApi } from "@/services/RanksApi";

import DetailsControls from "@/views/admin/components/shared/DetailsControls.vue";

@Component({
  components: {
    DetailsControls
  }
})
export default class AdminIndex extends Vue {
  protected id?: string;
  protected modelName?: string;

  get jwt() {
    return store.getters.getJwt;
  }

  onEdit() {
    if (this.modelName && this.id) {
      router.push({ name: `${this.modelName}sEditA`, params: { id: this.id } });
    }
  }
}
</script>
