<template>
  <div>
    <h1 class="text-center">{{$t('views.common.EditHeader')}}</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
      <div v-if="!ignoreTopColStyle" class="col-md-4">
        <ErrorsList :errors="errors"></ErrorsList>
        <slot></slot>
        <EditControls v-on:model-submit="$emit('model-submit')" v-on:back-to-list="$emit('back-to-list')" />
      </div>
      <template v-else>
        <ErrorsList :errors="errors"></ErrorsList>
        <slot></slot>
        <EditControls v-on:model-submit="$emit('model-submit')" v-on:back-to-list="$emit('back-to-list')" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import EditControls from "@/views/admin/components/shared/EditControls.vue";

import ErrorsList from "@/components/shared/ErrorsList.vue";
import BaseWrapper from "./BaseWrapper.vue";

@Component({
  components: {
    EditControls,
    ErrorsList,
  },
})
export default class AdminEditWrapper extends BaseWrapper {
  @Prop({ default: () => [] }) errors!: string[];
}
</script>
