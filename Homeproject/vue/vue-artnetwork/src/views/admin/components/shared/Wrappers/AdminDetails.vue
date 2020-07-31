<template>
  <div>
    <h1>{{$t('views.common.DetailsHeader')}}</h1>
    <hr />
    <div>
      <slot></slot>
    </div>
    <hr />
    <DetailsControls v-on:onEdit="$emit('onEdit')" v-on:onBackToList="$emit('onBackToList')" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import DetailsControls from "@/views/admin/components/shared/DetailsControls.vue";

@Component({
  components: {
    DetailsControls,
  },
})
export default class AdminDetailsWrapper extends Vue {}
</script>
