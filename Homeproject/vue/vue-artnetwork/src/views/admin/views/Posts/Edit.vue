<template>
  <div v-if="Id && Model">
    <h1 class="text-center">Edit</h1>
    <hr />
    <div class="row text-center align-items-center d-flex flex-column">
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
          <label class="control-label" for="profileId">Profile (ID)</label>
          <input class="form-control" type="text" required id="profileId" name="profileId" v-model="Model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="postTitle">Title</label>
          <input class="form-control" type="text" required id="postTitle" name="postTitle" v-model="Model.postTitle" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="prpostDescriptionice">Description</label>
          <input
            class="form-control"
            type="text"
            required
            id="postDescription"
            name="postDescription"
            v-model="Model.postDescription"
          />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="postPublicationDateTime">DateTime</label>
          <input
            class="form-control"
            type="text"
            required
            id="postPublicationDateTime"
            name="postPublicationDateTime"
            v-model="Model.postPublicationDateTime"
          />
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

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Save</button>
          <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import $ from "jquery";

import { IPostAdminDTO } from "@/types/IPostDTO";
import { IImageDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import ImageComponent from "@/components/Image.vue";

import { PostsApi } from "@/services/admin/PostsApi";
import { ImagesApi } from "@/services/ImagesApi";
import { ImageType } from "@/types/Enums/ImageType";

@Component({
  components: {
    ImageComponent
  }
})
export default class PostsEditA extends Vue {
  @Prop()
  private id!: string;

  private Model: IPostAdminDTO | null = null;
  private imageModel: IImageDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  get fileName() {
    return this.imageModel?.imageFile?.name;
  }

  get isImageExist() {
    return this.Model?.postImageId != null;
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
    PostsApi.details(this.Id, this.jwt).then((response: IPostAdminDTO) => {
      this.Model = response;
      if (this.isImageExist) {
        ImagesApi.getImageModel(response.postImageId!, this.jwt).then(
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
          imageFor: ""
        };
      }
    });
  }

  submit() {
    if (this.Id && this.Model) {
      PostsApi.edit(this.Id, this.Model, this.jwt).then(
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
