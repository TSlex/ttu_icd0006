<template>
  <div>
    <div class="post_create mt-5">
      <div class="row justify-content-center text-center">
        <div class="col-md-8">
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
              <textarea rows="5" class="form-control" id="postDescription" v-model="postModel.postDescription" />
            </div>
            <div class="form-group">
              <label class="control-label" for="postImageUrl">Post Image Url</label>
              <input class="form-control" id="postImageUrl" v-model="postModel.postImageUrl" />
            </div>
            <div class="form-group">
              <button class="btn btn-primary mr-1" @click="goBack">Cancel</button>
              <button type="submit" class="btn btn-primary" @click="onSubmit">Create</button>
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
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component
export default class PostsCreate extends Vue {
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
