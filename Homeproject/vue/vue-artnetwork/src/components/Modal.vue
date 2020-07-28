<template>
  <div class="modal_back" @click="$emit('closeModal')" @click.stop>
    <div class="gift_gallery_modal" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Modal extends Vue {}
</script>
