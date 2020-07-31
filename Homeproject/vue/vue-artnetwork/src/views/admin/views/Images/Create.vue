<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div v-show="isImageLoaded" class="card" style="width: 40rem; user-select: none; position: relative;" id="image-miniature">
      <ImageComponent height="inherit" width="inherit" :original="true" htmlId="render_image" htmlClass="card-img" />
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label class="control-label" for="ImageFor">For (ID)</label>
        <input class="form-control" type="text" id="ImageFor" maxlength="300" name="ImageFor" v-model="Model.imageFor" />
      </div>

      <div class="form-group">
        <label class="control-label" for="ImageType">Type</label>
        <select class="form-control" type="text" id="ImageType" maxlength="300" name="ImageType" v-model="Model.imageType">
          <option v-for="(key, value) in ImageType" :key="key" :value="Number(value)">{{key}}</option>
        </select>
      </div>

      <div class="custom-file">
        <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" @change="loadFile" />
        <label class="custom-file-label" style="overflow: hidden">{{fileName}}</label>
      </div>

      <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="Model.heightPx" />
      <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="Model.widthPx" />
      <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="Model.paddingTop" />
      <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="Model.paddingRight" />
      <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="Model.paddingBottom" />
      <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="Model.paddingLeft" />
    </div>
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IImageAdminDTO } from "@/types/IImageDTO";

import ImageComponent from "@/components/Image.vue";

import { ImagesApi } from "@/services/admin/ImagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { ImageType } from "@/types/Enums/ImageType";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ImagesCreateA extends AdminCreate {
  private Model: IImageAdminDTO = {
    id: "",
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    imageUrl: "",
    originalImageUrl: "",
    heightPx: 0,
    widthPx: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    imageFile: null,
    imageType: ImageType.Undefined,
    imageFor: "",
  };

  private isImageLoaded: boolean = false;

  get fileName() {
    return this.Model?.imageFile?.name;
  }

  get ImageType() {
    return Object.keys(ImageType).filter((key) => {
      return isNaN(Number(key));
    });
  }

  loadFile(event: Event) {
    this.Model!.imageFile = (event.target as HTMLInputElement)?.files![0];

    if (this.Model && this.Model.imageFile) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let image = new Image();
        image.src = e.target!.result as string;

        console.log("reader");

        image.onload = function () {
          console.log("image");

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

      reader.readAsDataURL(this.Model.imageFile);
      this.isImageLoaded = true;
    }
  }

  updated() {
    let exist = document.getElementById("image_miniature_script");

    if (exist) {
      // exist.remove();
    } else {
      let script = document.createElement("script");
      script.setAttribute("id", "image_miniature_script");
      script.setAttribute("src", "image-miniature.js");
      script.setAttribute("defer", "defer");
      document.body.appendChild(script);
    }
  }

  submit() {
    if (
      this.Model.commentValue.length > 0 &&
      this.Model.profileId.length > 0 &&
      this.Model.postId.length > 0
    ) {
      ImagesApi.create(this.Model, this.jwt).then((response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      });
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
