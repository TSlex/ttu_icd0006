<template>
  <div>
    <h1>{{$t('views.common.DetailsHeader')}}</h1>
    <hr />
    <div>
      <slot></slot>
    </div>
    <hr />
    <DetailsControls v-on:view-edit="$emit('view-edit')" v-on:back-to-list="$emit('back-to-list')" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import DetailsControls from "@/views/admin/components/shared/DetailsControls.vue";
import BaseWrapper from "./BaseWrapper.vue";

@Component({
  components: {
    DetailsControls,
  },
})
export default class AdminDetailsWrapper extends BaseWrapper {}
</script>
