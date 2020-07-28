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
import EventBus from "../events/EventBus";

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
  private src: string = "";

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

  get ImageData() {
    const imageId = this.IsOriginal ? this.id + ":original" : this.id;

    return store.getters.getImageData(imageId) ?? "";
  }

  loadImage(fetchForce?: boolean) {
    const data = this.ImageData;

    if (!this.IsOriginal) {
      if (!fetchForce && data.length > 0) {
        this.src = data;
        this.onImageLoaded();
      } else {
        ImagesApi.getImage(this.Id).then((imageData) => {
          store.commit("setImageData", { imageData: imageData, id: this.Id });
          this.src = imageData;
          this.onImageLoaded();
        });
      }
    } else {
      if (!fetchForce && data.length > 0) {
        this.src = data;
        this.onImageLoaded();
      } else {
        ImagesApi.getOriginalImage(this.Id).then((imageData) => {
          store.commit("setImageData", {
            imageData: imageData,
            id: this.Id + ":original",
          });
          this.src = imageData;
          this.onImageLoaded();
        });
      }
    }
  }

  onImageLoaded() {
    this.imageLoaded = true;
    this.$emit("imageLoaded");
  }

  beforeCreate() {
    EventBus.$on("updateImage", (id: string) => {
      const FullId = this.IsOriginal ? `${this.id}:original` : this.id;

      if (FullId === id) {
        this.imageLoaded = false;
        this.loadImage(true);
      }
    });
  }

  mounted() {
    this.loadImage();
  }
}
</script>
