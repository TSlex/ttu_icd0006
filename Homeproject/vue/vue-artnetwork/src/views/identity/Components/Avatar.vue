<template>
  <div v-if="imageModel">
    <h4 class>Avatar</h4>

    <div class="row d-flex flex-column align-items-center text-center mt-2">
      <div class="card" style="width: 20rem; user-select: none; position: relative;" id="image-miniature">
        <ImageComponent
          :id="profile.profileAvatarId"
          :key="profile.profileAvatarId"
          height="inherit"
          width="inherit"
          :original="true"
          htmlId="render_image"
          htmlClass="card-img"
        />
      </div>

      <div class="col-md-8">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li style="display:none"></li>
          </ul>
        </div>

        <div class="custom-file">
          <input type="file" class="custom-file-input" lang="ru-RU" id="ImageFile" name="ImageFile" @change="loadFile" />
          <label class="custom-file-label" style="overflow: hidden">{{fileName}}</label>
        </div>

        <input type="hidden" id="HeightPx" name="HeightPx" v-model.lazy="imageModel.heightPx" />
        <input type="hidden" id="WidthPx" name="WidthPx" v-model.lazy="imageModel.widthPx" />
        <input type="hidden" id="PaddingTop" name="PaddingTop" v-model.lazy="imageModel.paddingTop" />
        <input type="hidden" id="PaddingRight" name="PaddingRight" v-model.lazy="imageModel.paddingRight" />
        <input type="hidden" id="PaddingBottom" name="PaddingBottom" v-model.lazy="imageModel.paddingBottom" />
        <input type="hidden" id="PaddingLeft" name="PaddingLeft" v-model.lazy="imageModel.paddingLeft" />

        <div class="form-group mt-2">
          <button type="submit" class="btn btn-success mt-2" @click="submit">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../../components/Image.vue";
import store from "@/store";
import { IProfileDTO } from "../../../types/IProfileDTO";
import { ProfilesApi } from "../../../services/ProfilesApi";
import {
  IImageDTO,
  IImagePostDTO,
  IImagePutDTO,
} from "../../../types/IImageDTO";
import { ImagesApi } from "../../../services/ImagesApi";
import { ImageType } from "../../../types/Enums/ImageType";
import $ from "jquery";
import { PostsApi } from "../../../services/PostsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import IdentityStore from "../../../components/shared/IdentityStore.vue";

@Component({
  components: {
    ImageComponent,
  },
})
export default class Avatar extends IdentityStore {
  private imageModel: IImageDTO | null = null;

  get isAvatarExist() {
    return this.profile?.profileAvatarId != null;
  }

  get fileName() {
    return this.imageModel?.imageFile?.name;
  }

  private profile: IProfileDTO | null = null;

  beforeMount() {
    ProfilesApi.getProfile(this.userName, this.jwt).then(
      (response: IProfileDTO) => {
        this.profile = response;
        if (this.isAvatarExist) {
          ImagesApi.getImageModel(this.profile!.profileAvatarId, this.jwt).then(
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
      }
    );
  }

  loadFile(event: Event) {
    this.imageModel!.imageFile = (event.target as HTMLInputElement)?.files![0];

    if (this.imageModel && this.imageModel.imageFile) {
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

      reader.readAsDataURL(this.imageModel.imageFile);
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
    console.log(this.imageModel);

    if (!this.isAvatarExist && this.imageModel) {
      let postModel: IImagePostDTO = {
        heightPx: this.imageModel.heightPx,
        widthPx: this.imageModel.widthPx,
        paddingTop: this.imageModel.paddingTop,
        paddingRight: this.imageModel.paddingRight,
        paddingBottom: this.imageModel.paddingBottom,
        paddingLeft: this.imageModel.paddingLeft,
        imageFile: this.imageModel.imageFile,
        imageType: ImageType.ProfileAvatar,
        imageFor: "",
      };

      ImagesApi.postImageModel(postModel, this.jwt).then(
        (response: IImageDTO) => {
          console.log(response);
        }
      );
    } else if (this.isAvatarExist && this.imageModel) {
      let putModel: IImagePutDTO = {
        id: this.imageModel.id,
        heightPx: this.imageModel.heightPx,
        widthPx: this.imageModel.widthPx,
        paddingTop: this.imageModel.paddingTop,
        paddingRight: this.imageModel.paddingRight,
        paddingBottom: this.imageModel.paddingBottom,
        paddingLeft: this.imageModel.paddingLeft,
        imageFile: this.imageModel.imageFile,
      };

      ImagesApi.putImageModel(this.imageModel.id, putModel, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors) {
            this.$swal({
              icon: "success",
              title: "Avatar was updated!",
              showConfirmButton: true,
            });
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
