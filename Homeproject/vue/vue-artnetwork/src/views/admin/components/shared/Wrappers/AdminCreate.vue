<template>
  <div>
    <h1 class="text-center">{{$t('views.common.CreateHeader')}}</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
      <div v-if="!ignoreTopColStyle" class="col-md-4">
        <ErrorsList :errors="errors"></ErrorsList>
        <slot></slot>
        <CreateControls v-on:onSubmit="$emit('onSubmit')" v-on:onBackToList="$emit('onBackToList')" />
      </div>
      <template v-else>
        <ErrorsList :errors="errors"></ErrorsList>
        <slot></slot>
        <CreateControls v-on:onSubmit="$emit('onSubmit')" v-on:onBackToList="$emit('onBackToList')" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import CreateControls from "@/views/admin/components/shared/CreateControls.vue";

import ErrorsList from "@/components/shared/ErrorsList.vue";
import BaseWrapper from "./BaseWrapper.vue";

@Component({
  components: {
    CreateControls,
    ErrorsList,
  },
})
export default class AdminCreateWrapper extends BaseWrapper {
  @Prop({ default: [] }) errors!: string[];
}
</script>
