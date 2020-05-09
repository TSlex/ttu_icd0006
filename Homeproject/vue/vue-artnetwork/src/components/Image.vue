<template>
  <img v-if="src" img :src="src" alt="image component" :height="Height" :width="Width" />
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

  get Id() {
    return this.id ?? "null";
  }

  get Height() {
    return this.height ?? "150px";
  }

  get Width() {
    return this.width ?? "150px";
  }

  private src: string = "";

  beforeMount() {
    ImagesApi.getImage(this.Id).then(imageData => {
      // this.src = 'data:image/jpg;base64,'.concat(imageData);
      this.src = imageData;
    });
  }
}
</script>
