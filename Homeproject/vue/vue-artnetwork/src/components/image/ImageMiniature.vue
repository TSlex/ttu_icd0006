<template>
  <div v-show="isImageLoaded" :style="Style" :class="htmlClass" id="image-miniature">
    <ImageComponent
      :id="initialId"
      :key="initialId"
      height="inherit"
      width="inherit"
      :original="true"
      htmlId="render_image"
      htmlClass="card-img"
      v-on:image-loaded="loadMiniatureControl()"
    />
  </div>
</template>

<script lang='ts'>
import $ from "jquery";
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "@/components/Image.vue";
import { IImagePostDTO, IImageDTO, IImagePutDTO } from "../../types/IImageDTO";
import store from "@/store";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ImageMiniature extends Vue {
  @Prop() initialId?: string;
  @Prop({ default: "" }) htmlStyle?: string;
  @Prop({ default: "card" }) htmlClass?: string;

  private isImageLoaded: boolean = false;

  get Style() {
    return ["width: 18rem; user-select: none;", this.htmlStyle].join(" ");
  }

  loadImage(file: File) {
    let reader = new FileReader();

    reader.onload = function (e) {
      let image = new Image();
      image.src = e.target!.result as string;

      image.onload = function () {
        let height = $("#HeightPx");
        let width = $("#WidthPx");
        height.attr("value", image.height);
        width.attr("value", image.width);

        height.get()[0].dispatchEvent(new Event("change"));
        width.get()[0].dispatchEvent(new Event("change"));
      };

      $("#render_image").attr("src", image.src);
      $("#image-miniature").css("visibility", "visible");
    };

    reader.readAsDataURL(file);
    this.isImageLoaded = true;
  }

  loadMiniatureControl() {
    let script = document.createElement("script");

    script.setAttribute("id", "image_miniature_script");
    script.setAttribute("src", "image-miniature.js");
    script.setAttribute("defer", "defer");

    document.body.appendChild(script);
  }

  onSubmit() {
    this.$emit("model-submit");
  }

  created() {
    if (this.initialId) {
      this.isImageLoaded = true;
    }
  }

  beforeDestroy() {
    let exist = document.getElementById("image_miniature_script");

    if (exist) {
      exist.remove();
    }
  }
}
</script>
