<template>
  <div>
    <h1 class="text-center">{{$t('views.common.IndexHeader')}}</h1>
    <p class="text-center" style="font-size: 30px" v-if="canCreate">
      <a class="far fa-plus-square" href="#" @click="$emit('view-create')" @click.prevent></a>
    </p>
    <br v-else />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IdentityStore from "@/components/shared/IdentityStore.vue";

import { RanksApi } from "@/services/RanksApi";

import router from "@/router";
import BaseWrapper from "./BaseWrapper.vue";

@Component({
  components: {},
})
export default class AdminIndexWrapper extends BaseWrapper {
  @Prop({ default: false }) canCreate?: boolean;
}
</script>
