<template>
  <div>
    <h4 class="text-center">Create post</h4>
    <br />
    <div class="post_create">
      <div class="row justify-content-center text-center">
        <div class="col-md-6">
          <form asp-action="Create">
            <div class="text-danger">
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{error}}</li>
              </ul>
            </div>
            <div class="form-group">
              <label class="control-label" for="postTitle">Post Title</label>
              <input class="form-control" id="postTitle" v-model="postModel.postTitle" />
            </div>
            <div class="form-group">
              <label class="control-label" for="postDescription">Post Desription</label>
              <textarea class="form-control" id="postDescription" v-model="postModel.postDescription" />
            </div>
            <div class="custom-file mb-3">
              <input
                type="file"
                id="ImageFile"
                accept=".jpeg, .png, .jpg"
                required
                class="custom-file-input"
                name="PostImage.ImageFile"
              />
              <label class="custom-file-label text-left" style="overflow: hidden"></label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-success mr-1" @click="onSubmit">Create</button>
              <button class="btn btn-secondary" @click="goBack">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";
import { IPostPostDTO } from "@/types/IPostDTO";
import { IImagePostDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component
export default class PostsCreate extends Vue {
  private imageModel: IImagePostDTO = {
    paddingTop: -1,
    paddingRight: -1,
    paddingBottom: -1,
    paddingLeft: -1,
    imageFile: "",
    imageType: -1,
    imageFor: ""
  };

  private postModel: IPostPostDTO = {
    postTitle: "",
    postDescription: "",
    postImageUrl: "",
    postImageId: null
  };

  private errors: string[] = [];

  goBack(e: Event) {
    router.go(-1);

    e.preventDefault();
  }

  onSubmit(e: Event): void {
    this.errors = [];

    if (
      this.postModel.postTitle.length > 0 &&
      this.postModel.postDescription.length > 0 &&
      this.postModel.postImageUrl.length > 0
    ) {
      store
        .dispatch("postPost", this.postModel)
        .then((response: ResponseDTO) => {
          if (response.errors) {
            this.errors = response.errors;
          } else {
            router.push(`/profiles/${store.getters.getUserName}`);
          }
        });
    } else {
      this.errors.push("Ensure that all forms is filled!");
    }

    e.preventDefault();
  }
}
</script>
