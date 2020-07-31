<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div v-show="isImageLoaded" class="card" style="width: 20rem; user-select: none; position: relative;" id="image-miniature">
      <ImageComponent height="inherit" width="inherit" :original="true" htmlId="render_image" htmlClass="card-img" />
    </div>
    <div class="col-md-4">
      <div class="custom-file mt-2">
        <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" @change="loadFile" />
        <label class="custom-file-label" style="overflow: hidden">{{fileName}}</label>
      </div>

      <CreateEdit />

      <template v-if="imageModel">
        <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="imageModel.heightPx" />
        <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="imageModel.widthPx" />
        <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="imageModel.paddingTop" />
        <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="imageModel.paddingRight" />
        <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="imageModel.paddingBottom" />
        <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="imageModel.paddingLeft" />
      </template>
    </div>
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IPostAdminDTO } from "@/types/IPostDTO";

import ImageComponent from "@/components/Image.vue";

import { PostsApi } from "@/services/admin/PostsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import { IImagePostDTO } from "@/types/IImageDTO";
import { ImageType } from "@/types/Enums/ImageType";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    ImageComponent,
    CreateEdit,
  },
})
export default class PostsCreateA extends AdminCreate {
  private imageModel: IImagePostDTO = {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    imageFile: null,
    imageType: ImageType.Post,
    imageFor: "",
    heightPx: 0,
    widthPx: 0,
  };

  private Model: IPostAdminDTO = {
    id: "",
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    postTitle: "",
    postImageId: "",
    postDescription: "",
    postPublicationDateTime: new Date(),
    postFavoritesCount: 0,
    postCommentsCount: 0,
    profileId: "",
  };

  private isImageLoaded: boolean = false;

  get fileName() {
    return this.imageModel?.imageFile?.name;
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
      this.isImageLoaded = true;
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

  submit() {
    if (this.Model.profileId.length > 0 && this.Model.postTitle.length > 0) {
      PostsApi.create(this.Model, this.jwt).then((response: ResponseDTO) => {
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
