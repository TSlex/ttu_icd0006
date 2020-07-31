<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="card" style="width: 20rem; user-select: none; position: relative;" id="image-miniature">
      <ImageComponent
        v-if="imageModel"
        :id="imageModel.id"
        :key="imageModel.id"
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

      <div class="custom-file mt-2">
        <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" @change="loadFile" />
        <label class="custom-file-label" style="overflow: hidden">{{fileName}}</label>
      </div>

      <div class="form-group mt-3">
        <label class="control-label" for="giftCode">Code</label>
        <input class="form-control" type="text" required id="giftCode" name="giftCode" v-model="model.giftCode" />
        <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
      </div>

      <div class="form-group">
        <label class="control-label" for="giftName">Title</label>
        <input class="form-control" type="text" required id="giftName" name="giftName" v-model="model.giftName" />
        <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
      </div>

      <div class="form-group">
        <label class="control-label" for="price">Price</label>
        <input class="form-control" type="text" required id="price" name="price" v-model="model.price" />
        <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
      </div>

      <template v-if="imageModel">
        <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="imageModel.heightPx" />
        <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="imageModel.widthPx" />
        <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="imageModel.paddingTop" />
        <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="imageModel.paddingRight" />
        <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="imageModel.paddingBottom" />
        <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="imageModel.paddingLeft" />
      </template>
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IGiftAdminDTO } from "@/types/IGiftDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import ImageComponent from "@/components/Image.vue";

import { GiftsApi } from "@/services/admin/GiftsApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class GiftsEditA extends AdminEdit<IGiftAdminDTO> {
  private imageModel: IImageDTO | null = null;

  get fileName() {
    return this.imageModel?.imageFile?.name;
  }

  get isImageExist() {
    return this.model?.giftImageId != null;
  }

  loadFile(event: Event) {
    this.imageModel!.imageFile = (event.target as HTMLInputElement)?.files![0];

    if (this.imageModel && this.imageModel.imageFile) {
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

      reader.readAsDataURL(this.imageModel.imageFile);
    }
  }

  updated() {
    let image = document.getElementById("render_image");
    let exist = document.getElementById("image_miniature_script");

    if (exist) {
      // exist.remove();
    } else if (image) {
      let script = document.createElement("script");
      script.setAttribute("id", "image_miniature_script");
      script.setAttribute("src", "image-miniature.js");
      script.setAttribute("defer", "defer");
      document.body.appendChild(script);
    }
  }

  beforeMount() {
    GiftsApi.details(this.Id, this.jwt).then((response: IGiftAdminDTO) => {
      this.model = response;
      if (this.isImageExist) {
        ImagesApi.getImageModel(response.giftImageId!, this.jwt).then(
          (response: IImageDTO) => {
            this.imageModel = response;
          }
        );
      } else {
        this.imageModel = {
          id: "",
          imageUrl: "",
          originalImageUrl: "",
          heightPx: 0,
          widthPx: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          imageFile: null,
          imageType: ImageType.ProfileAvatar,
          imageFor: "",
        };
      }
    });
  }

  onSubmit() {
    if (this.Id && this.model) {
      GiftsApi.edit(this.Id, this.model, this.jwt).then(
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
