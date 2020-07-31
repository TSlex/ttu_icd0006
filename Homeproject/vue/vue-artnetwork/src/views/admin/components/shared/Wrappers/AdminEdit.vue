<template>
  <div>
    <h1 class="text-center">{{$t('views.common.EditHeader')}}</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
      <div class="col-md-4">
        <ErrorsList :errors="errors"></ErrorsList>
        <slot></slot>
        <EditControls v-on:onSubmit="$emit('onSubmit')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import EditControls from "@/views/admin/components/shared/EditControls.vue";

import ErrorsList from "@/components/shared/ErrorsList.vue";

@Component({
  components: {
    EditControls,
    ErrorsList,
  },
})
export default class AdminEditWrapper extends Vue {
  @Prop({ default: [] }) errors!: string[];
}
</script>
