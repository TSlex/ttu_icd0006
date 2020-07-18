<template>
  <div class="form-group">
    <button class="btn btn-success mr-1" @click="$emit('onSubmit')">Submit</button>
    <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class EditControls extends Vue {}
</script>
