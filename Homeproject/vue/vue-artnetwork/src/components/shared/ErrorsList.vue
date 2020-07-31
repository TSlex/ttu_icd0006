<template>
  <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{error}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ErrorsList extends Vue {
  @Prop() errors!: string[];
}
</script>
