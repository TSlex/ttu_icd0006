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
  components: {},
})
export default class AdminIndexWrapper extends Vue {
  @Prop({ default: true }) canCreate?: boolean;
}
</script>
