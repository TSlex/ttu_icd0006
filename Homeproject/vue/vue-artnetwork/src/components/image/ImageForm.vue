<template>
  <div>
    <div class="custom-file">
      <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" @change="onLoadFile" />
      <label class="custom-file-label" style="overflow: hidden">{{fileName}}</label>
    </div>

    <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="imageModel.heightPx" />
    <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="imageModel.widthPx" />
    <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="imageModel.paddingTop" />
    <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="imageModel.paddingRight" />
    <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="imageModel.paddingBottom" />
    <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="imageModel.paddingLeft" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { IImagePutDTO, IImagePostDTO, IImageDTO } from "@/types/IImageDTO";

@Component({
  components: {},
})
export default class ImageForm extends Vue {
  @Prop() imageModel!: IImagePutDTO | IImagePostDTO | IImageDTO;

  get fileName() {
    return this.imageModel?.imageFile?.name;
  }

  onLoadFile(event: Event) {
    this.$emit("file-load", (event.target as HTMLInputElement)?.files![0]);
  }
}
</script>
