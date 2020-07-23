<template>
  <div>
    <h4 class="text-center">{{$t('views.posts.CreateHeader')}}</h4>
    <br />
    <div class="post_create">
      <div class="row d-flex flex-column align-items-center text-center">
        <div v-show="isImageLoaded" class="card mb-2" id="image-miniature" style="width: 18rem; user-select: none">
          <ImageComponent height="inherit" width="inherit" :original="true" htmlId="render_image" htmlClass="card-img" />
        </div>
        <div class="col-md-6">
          <div class="text-danger">
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{error}}</li>
            </ul>
          </div>
          <div class="form-group">
            <label class="control-label" for="postTitle">{{$t('bll.posts.PostTitle')}}</label>
            <input class="form-control" id="postTitle" v-model="postModel.postTitle" />
          </div>
          <div class="form-group">
            <label class="control-label" for="postDescription">{{$t('bll.posts.PostDescription')}}</label>
            <textarea class="form-control" id="postDescription" v-model="postModel.postDescription" />
          </div>
          <div class="custom-file mb-3">
            <input
              type="file"
              id="ImageFile"
              accept=".jpeg, .png, .jpg"
              required
              class="custom-file-input"
              name="ImageFile"
              @change="loadFile"
            />
            <label class="custom-file-label text-left" style="overflow: hidden">{{fileName}}</label>
          </div>

          <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="imageModel.heightPx" />
          <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="imageModel.widthPx" />
          <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="imageModel.paddingTop" />
          <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="imageModel.paddingRight" />
          <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="imageModel.paddingBottom" />
          <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="imageModel.paddingLeft" />

          <div class="form-group">
            <button type="submit" class="btn btn-success mr-1" @click="submit">{{$t('views.common.CreateButton')}}</button>
            <button class="btn btn-secondary" @click="goBack">{{$t('views.common.CancelButton')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";
import $ from "jquery";

import ImageComponent from "../../components/Image.vue";

import { ImageType } from "../../types/Enums/ImageType";
import { IPostPostDTO } from "@/types/IPostDTO";
import { IImagePostDTO, IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ImagesApi } from "@/services/ImagesApi";

@Component({
  components: {
    ImageComponent
  }
})
export default class PostsCreate extends Vue {
  private imageModel: IImagePostDTO = {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    imageFile: null,
    imageType: ImageType.Post,
    imageFor: "",
    heightPx: 0,
    widthPx: 0
  };

  private postModel: IPostPostDTO = {
    id: "",
    postTitle: "",
    postDescription: "",
    postImageId: ""
  };

  private isImageLoaded: boolean = false;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get fileName() {
    console.log(this.imageModel?.imageFile?.name);
    return this.imageModel?.imageFile?.name;
  }

  goBack(e: Event) {
    router.go(-1);

    e.preventDefault();
  }

  loadFile(event: Event) {
    this.imageModel!.imageFile = (event.target as HTMLInputElement)?.files![0];

    if (this.imageModel && this.imageModel.imageFile) {
      let reader = new FileReader();

      reader.onload = function(e) {
        let image = new Image();
        image.src = e.target!.result as string;

        console.log("reader");

        image.onload = function() {
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
    this.errors = [];

    if (
      this.imageModel.imageFile &&
      this.postModel.postTitle.length > 0 &&
      this.postModel.postDescription!.length > 0
    ) {
      ImagesApi.postImageModel(this.imageModel, this.jwt).then(
        (response: IImageDTO) => {
          this.postModel.id = response.imageFor;
          this.postModel.postImageId = response.id;

          store
            .dispatch("postPost", this.postModel)
            .then((response: ResponseDTO) => {
              if (response.errors) {
                this.errors = response.errors;
              } else {
                router.push(`/profiles/${store.getters.getUserName}`);
              }
            });
        }
      );
    } else {
      this.errors.push("Ensure that all forms is filled!");
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
