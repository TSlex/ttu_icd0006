<template>
  <div class="modal_back" @click.prevent="$emit('closeGifts')"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import { IGiftDTO } from "@/types/IGiftDTO";

@Component
export default class GiftSelection extends Vue {
  @Prop()
  private gifts!: IGiftDTO;
}
</script>
