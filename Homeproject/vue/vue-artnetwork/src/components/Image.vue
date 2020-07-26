<template>
  <div>
    <template v-if="imageLoaded">
      <img :id="HtmlId" :class="HtmlClass" :src="src" alt="image component" :height="Height" :width="Width" draggable="false" />
    </template>
    <template v-else>
      <LoadingOverlay :fixed="false" :modalStyle="LoadingStyle" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ImagesApi } from "@/services/ImagesApi";

import LoadingOverlay from "@/components/LoadingOverlay.vue";

import store from "@/store";

@Component({
  components: {
    LoadingOverlay,
  },
})
export default class ImageComponent extends Vue {
  @Prop() private id!: string;
  @Prop() private height!: string;
  @Prop() private width!: string;
  @Prop() private htmlClass!: string | null;
  @Prop() private htmlId!: string | null;
  @Prop() private original!: boolean;

  private imageLoaded: boolean = false;

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

  get LoadingStyle() {
    let base =
      "position: relative; margin: auto; border-radius: 4px; overflow: hidden;";

    if (isNaN(Number(this.Width))) {
      base = base + " width: 100px;";
    } else {
      base = base + ` width: ${this.Width};`;
    }

    if (isNaN(Number(this.Height))) {
      base = base + " height: 100px;";
    } else {
      base = base + ` height: ${this.Height};`;
    }

    return base;
  }

  private src: string = "";

  mounted() {
    let data: string;

    if (!this.IsOriginal) {
      data = store.getters.getImageData(this.Id);

      if (data.length > 0) {
        this.src = data;
        this.imageLoaded = true;
      } else {
        ImagesApi.getImage(this.Id).then((imageData) => {
          store.commit("setImageData", { imageData: imageData, id: this.Id });
          this.src = imageData;
          this.imageLoaded = true;
        });
      }
    } else {
      data = store.getters.getImageData(this.Id + ":original");

      if (data.length > 0) {
        this.src = data;
        this.imageLoaded = true;
      } else {
        ImagesApi.getOriginalImage(this.Id).then((imageData) => {
          store.commit("setImageData", {
            imageData: imageData,
            id: this.Id + ":original",
          });
          this.src = imageData;
          this.imageLoaded = true;
        });
      }
    }
  }
}
</script>
