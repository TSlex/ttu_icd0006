<template>
  <div>
    <h1>{{$t('views.common.IndexHeader')}}</h1>
    <p v-if="CanCreate">
      <a href="#" @click="$emit('onCreate')" @click.prevent>Create New</a>
    </p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IdentityStore from "@/components/shared/IdentityStore.vue";

import { RanksApi } from "@/services/RanksApi";

import router from "@/router";

@Component({
  components: {}
})
export default class AdminIndex extends IdentityStore {
  protected modelName?: string;

  @Prop() protected canCreate?: boolean;

  get CanCreate() {
    return this.canCreate ?? true;
  }

  get ModelName() {
    return this.modelName ?? null;
  }

  onCreate() {
    if (this.ModelName && this.CanCreate) {
      router.push({ name: `${this.ModelName}sCreateA` });
    }
  }

  onEdit(id: string) {
    if (this.ModelName) {
      router.push({ name: `${this.ModelName}sEditA`, params: { id } });
    }
  }

  onDetails(id: string) {
    if (this.ModelName) {
      router.push({ name: `${this.ModelName}sDetailsA`, params: { id } });
    }
  }
}
</script>
