<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IRankAdminDTO } from "@/types/IRankDTO";

@Component({
  components: {}
})
export default class CreateEdit extends Vue {
  @Prop() model!: IRankAdminDTO;
}
</script>

<style>
</style>
