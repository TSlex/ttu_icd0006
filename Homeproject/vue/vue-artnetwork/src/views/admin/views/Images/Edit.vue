<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="card" style="width: 40rem; user-select: none; position: relative;" id="image-miniature">
      <ImageComponent
        :id="id"
        :key="id"
        height="inherit"
        width="inherit"
        :original="true"
        htmlId="render_image"
        htmlClass="card-img"
      />
    </div>
    <div class="col-md-4">
      <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>
      </div>

      <div class="form-group">
        <label class="control-label" for="ImageUrl">URL</label>
        <input class="form-control" type="text" required id="ImageUrl" maxlength="300" name="ImageUrl" v-model="model.imageUrl" />
        <span class="text-danger field-validation-valid" data-valmsg-for="ImageUrl" data-valmsg-replace="true"></span>
      </div>

      <div class="form-group">
        <label class="control-label" for="ImageUrlO">URL original</label>
        <input
          class="form-control"
          type="text"
          required
          id="ImageUrlO"
          maxlength="300"
          name="ImageUrlO"
          v-model="model.originalImageUrl"
        />
        <span class="text-danger field-validation-valid" data-valmsg-for="ImageUrl" data-valmsg-replace="true"></span>
      </div>

      <div class="form-group">
        <label class="control-label" for="ImageFor">For (ID)</label>
        <input class="form-control" type="text" id="ImageFor" maxlength="300" name="ImageFor" v-model="model.imageFor" />
        <span class="text-danger field-validation-valid" data-valmsg-for="ImageFor" data-valmsg-replace="true"></span>
      </div>

      <div class="form-group">
        <label class="control-label" for="ImageType">Type</label>
        <select
          class="form-control"
          type="text"
          required
          id="ImageType"
          maxlength="300"
          name="ImageType"
          v-model="model.imageType"
        >
          <option v-for="(key, value) in ImageType" :key="key" :value="Number(value)">{{key}}</option>
        </select>
        <span class="text-danger field-validation-valid" data-valmsg-for="ImageUrl" data-valmsg-replace="true"></span>
      </div>

      <div class="custom-file">
        <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" @change="loadFile" />
        <label class="custom-file-label" style="overflow: hidden">{{fileName}}</label>
      </div>

      <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="model.heightPx" />
      <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="model.widthPx" />
      <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="model.paddingTop" />
      <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="model.paddingRight" />
      <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="model.paddingBottom" />
      <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="model.paddingLeft" />
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
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
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ImagesEditA extends AdminEdit<IImageAdminDTO> {
  get ImageType() {
    return Object.keys(ImageType).filter((key) => {
      return isNaN(Number(key));
    });
  }

  get fileName() {
    return this.model?.imageFile?.name;
  }

  loadFile(event: Event) {
    this.model!.imageFile = (event.target as HTMLInputElement)?.files![0];

    if (this.model && this.model.imageFile) {
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

      reader.readAsDataURL(this.model.imageFile);
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

  mounted() {
    ImagesApi.details(this.Id, this.jwt).then((response: IImageAdminDTO) => {
      this.model = response;
    });
  }

  onSubmit() {
    if (this.Id && this.model) {
      ImagesApi.edit(this.Id, this.model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
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
