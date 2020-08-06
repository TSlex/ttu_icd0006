<template>
  <div :style="htmlParentStyle">
    <template v-if="imageLoaded">
      <img
        :id="HtmlId"
        :class="HtmlClass"
        :style="htmlStyle"
        :src="src"
        alt="image component"
        :height="Height"
        :width="Width"
        draggable="false"
      />
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

  @Prop() private htmlStyle!: string | null;
  @Prop() private htmlParentStyle!: string | null;

  @Prop({ default: false }) private loadGift?: boolean;
  @Prop({ default: false }) private loadPost?: boolean;

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

    if (!fetchForce && data.length > 0) {
      this.src = data;
      this.onImageLoaded();
    } else {
      if (!this.IsOriginal && !this.loadGift && !this.loadPost) {
        this._loadImage(fetchForce);
      } else if (this.loadGift) {
        this._loadGiftImage(fetchForce);
      } else if (this.loadPost) {
        this._loadPostImage(fetchForce);
      } else {
        this._loadOriginalImage(fetchForce);
      }
    }
  }

  _loadImage(fetchForce?: boolean) {
    ImagesApi.getImage(this.Id).then((imageData) => {
      store.commit("setImageData", { imageData: imageData, id: this.Id });
      this.src = imageData;
      this.onImageLoaded();
    });
  }

  _loadOriginalImage(fetchForce?: boolean) {
    ImagesApi.getOriginalImage(this.Id).then((imageData) => {
      store.commit("setImageData", {
        imageData: imageData,
        id: this.Id + ":original",
      });
      this.src = imageData;
      this.onImageLoaded();
    });
  }

  _loadGiftImage(fetchForce?: boolean) {
    ImagesApi.getGiftImage(this.Id).then((imageData) => {
      store.commit("setImageData", {
        imageData: imageData,
        id: this.Id + ":gift",
      });
      this.src = imageData;
      this.onImageLoaded();
    });
  }

  _loadPostImage(fetchForce?: boolean) {
    ImagesApi.getPostImage(this.Id).then((imageData) => {
      store.commit("setImageData", {
        imageData: imageData,
        id: this.Id + ":post",
      });
      this.src = imageData;
      this.onImageLoaded();
    });
  }

  onImageLoaded() {
    this.imageLoaded = true;
    this.$emit("image-loaded");
  }

  beforeCreate() {
    EventBus.$on("image-update", (id: string) => {
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
