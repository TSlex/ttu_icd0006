<template>
  <div class="form-group">
    <button class="btn btn-success mr-1" @click="$emit('model-submit')">{{$t('views.common.SaveButton')}}</button>
    <button class="btn btn-secondary" @click="$emit('onBackToList')">{{$t('views.common.BackToListButton')}}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class EditControls extends Vue {}
</script>
