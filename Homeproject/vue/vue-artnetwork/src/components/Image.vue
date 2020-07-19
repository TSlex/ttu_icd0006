<template v-if="src">
  <img :id="HtmlId" :class="HtmlClass" :src="src" alt="image component" :height="Height" :width="Width" draggable="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ImagesApi } from "@/services/ImagesApi";

import store from "@/store";

@Component
export default class ImageComponent extends Vue {
  @Prop() private id!: string;
  @Prop() private height!: string;
  @Prop() private width!: string;
  @Prop() private htmlClass!: string | null;
  @Prop() private htmlId!: string | null;
  @Prop() private original!: boolean;

  get Id() {
    return this.id ?? "null";
  }

  get Height() {
    return this.height ?? "150px";
  }

  get Width() {
    return this.width ?? "150px";
  }

  get HtmlClass() {
    return this.htmlClass ?? null;
  }

  get HtmlId() {
    return this.htmlId ?? null;
  }

  get IsOriginal() {
    return this.original ?? false;
  }

  private src: string = "";

  beforeMount() {
    if (!this.IsOriginal) {
      ImagesApi.getImage(this.Id).then(imageData => {
        this.src = imageData;
      });
    } else {
      ImagesApi.getOriginalImage(this.Id).then(imageData => {
        this.src = imageData;
      });
    }
  }
}
</script>
