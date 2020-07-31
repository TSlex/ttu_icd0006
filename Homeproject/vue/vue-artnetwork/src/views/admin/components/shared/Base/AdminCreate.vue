<template>
  <div>
    <h1 class="text-center">{{$t('views.common.CreateHeader')}}</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
      <div class="col-md-4">
        <ErrorsList :errors="errors"></ErrorsList>
        <slot></slot>
        <CreateControls v-on:onSubmit="$emit('onSubmit')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ErrorListContainer from "@/components/shared/ErrorListContainer.vue";

import { RanksApi } from "@/services/RanksApi";

import CreateControls from "@/views/admin/components/shared/CreateControls.vue";

import ErrorsList from "@/components/shared/ErrorsList.vue";

@Component({
  components: {
    CreateControls,
    ErrorsList,
  },
})
export default class AdminCreate<TModel> extends ErrorListContainer {}
</script>
