<template>
  <div class="post_details_post">
    <div class="post_image">
      <div v-if="isAuthenticated && userName == post.profileUsername" class="post_controls">
        <template v-if="!postEditing">
          <a class="fa fa-edit mr-2 btn-link" href="#" @click="onEditPost(true)"></a>
          <a class="fa fa-times-circle btn-link" href="#" @click="onDeletePost"></a>
        </template>
        <template v-else>
          <a class="fa fa-check mr-2 btn-link" href="#" @click="onPutPost"></a>
          <a class="fa fa-times btn-link" href="#" @click="onEditPost(false)"></a>
        </template>
      </div>
      <template v-if="isAuthenticated && userName == post.profileUsername">
        <div class="post_controls" style="position: absolute; top: 0; left: 0; width: fit-content">
          <a class="fa fa-paint-brush btn-link" @click="$emit('image-edit-open')"></a>
        </div>
      </template>
      <ImageComponent v-if="!imageEditing" :id="post.postImageId" :key="post.postImageId" height="unset" width="unset" />
    </div>

    <div class="post_details_meta_section">
      <template v-if="!postEditing">
        <p>{{post.postTitle}} {{$t('views.posts.ByUsername')}} "{{post.profileUsername}}"</p>
        <span>{{post.postDescription}}</span>
      </template>
      <template v-else>
        <p>
          <input type="text" class="post_title text-center" v-model="postPutModel.postTitle" />
          {{$t('views.posts.ByUsername')}} "{{post.profileUsername}}"
        </p>
        <textarea class="post_description text-center" rows="2" v-model="postPutModel.postDescription"></textarea>
      </template>

      <ul class="post_meta_section">
        <li class="post_meta">
          <span class="meta_title">{{post.postPublicationDateTime | formatDate}}</span>
        </li>
        <li class="post_meta btn-link" @click="$emit('favorites-open')">
          <span class="meta_counter">{{post.postFavoritesCount}}&nbsp;</span>
          <span class="meta_title">{{$t('views.posts.OfFavorites')}}</span>
        </li>
        <li class="post_meta">
          <span class="meta_counter">{{post.postCommentsCount}}&nbsp;</span>
          <span class="meta_title">{{$t('views.posts.OfComments')}}</span>
        </li>
        <li v-if="isAuthenticated">
          <a v-if="post.isFavorite" class="fas fa-heart btn-link" @click="onUnfavorite"></a>
          <a v-else class="far fa-heart btn-link" @click="onFavorite"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IdentityStore from "../../components/shared/IdentityStore.vue";
import { IPostDTO, IPostPutDTO } from "@/types/IPostDTO";
import store from "@/store";
import ImageComponent from "../../components/Image.vue";
import { PostsApi } from "@/services/PostsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent,
  },
})
export default class PostSection extends IdentityStore {
  @Prop() imageEditing!: boolean;

  private postEditing: boolean = false;

  private postPutModel: IPostPutDTO = {
    id: this.post!.id,
    postTitle: this.post!.postTitle,
    postDescription: this.post!.postDescription,
  };

  get comments() {
    return store.state.comments;
  }

  get post(): IPostDTO | null {
    return store.state.selectedPost;
  }

  onEditPost(mode: boolean) {
    this.postEditing = mode;
  }

  onPutPost() {
    if (
      this.post &&
      this.postPutModel.id.length > 0 &&
      this.postPutModel.postTitle.length > 0 &&
      this.postPutModel.postDescription!.length > 0
    ) {
      this.postEditing = false;

      store.dispatch("putPost", this.postPutModel);
    }
  }

  onDeletePost() {
    this.$swal({
      icon: "warning",
      title: this.$t("views.common.DeleteConfirm"),
      text: this.$t("views.common.DeletePermanent"),
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: this.$t("views.common.DeleteButton"),
      cancelButtonText: this.$t("views.common.CancelButton"),
    }).then((result: any) => {
      if (result.value) {
        store.dispatch("deletePost", { ...this.post });
        this.$emit("post-close");
      }
    });
  }

  onFavorite() {
    if (this.post) {
      this.post.isFavorite = true;
      this.post.postFavoritesCount += 1;
      PostsApi.favorite(this.post.id, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.post) {
            // this.post.isFavorite = true;
            // this.post.postFavoritesCount += 1;
          }
        }
      );
    }
  }

  onUnfavorite() {
    if (this.post) {
      this.post.isFavorite = false;
      this.post.postFavoritesCount -= 1;
      PostsApi.unfavorite(this.post.id, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.post) {
            // this.post.isFavorite = false;
            // this.post.postFavoritesCount -= 1;
          }
        }
      );
    }
  }
}
</script>

<style>
</style>
