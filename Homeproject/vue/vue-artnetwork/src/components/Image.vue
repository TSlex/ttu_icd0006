<template v-if="src">
  <img v-if="Class" :class="Class" :src="src" alt="image component" :height="Height" :width="Width" />
  <img v-else :src="src" alt="image component" :height="Height" :width="Width" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ImagesApi } from "../services/ImagesApi";
import store from "../store";

@Component
export default class ImageComponent extends Vue {
  @Prop() private id!: string;
  @Prop() private height!: string;
  @Prop() private width!: string;
  @Prop() private htmlClass!: string;

  get Id() {
    return this.id ?? "null";
  }

  get Height() {
    return this.height ?? "150px";
  }

  get Width() {
    return this.width ?? "150px";
  }

  get Class() {
    return this.htmlClass ?? null;
  }

  private src: string = "";

  beforeMount() {
    ImagesApi.getImage(this.Id).then(imageData => {
      this.src = imageData;
    });
  }
}
</script>
