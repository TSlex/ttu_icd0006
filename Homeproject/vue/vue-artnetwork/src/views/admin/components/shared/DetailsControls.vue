<template>
  <div>
    <button class="btn btn-success mr-1" @click="$emit('onEdit')">Edit</button>
    <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class DetailsControls extends Vue {
  @Prop() id!: string;
}
</script>
