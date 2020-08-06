<template>
  <div class="modal_back" @click="closePost">
    <ProfilesModal v-if="favorites" :profilesData="favorites" v-on:profiles-close="closeFavorites" />
    <Modal v-if="imageEditing" v-on:modal-close="closeImageEdit">
      <PostsEditImage :id="post.postImageId" v-on:modal-close="closeImageEdit" />
    </Modal>
    <div class="post_details" @click.stop>
      <PostSection
        v-on:image-edit-open="openImageEdit"
        v-on:favorites-open="openFavorites"
        :imageEditing="imageEditing"
        v-on:post-close="closePost"
      />
      <CommentsSection />
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import router from "../../router";
import { IPostDTO, IPostPutDTO } from "../../types/IPostDTO";
import {
  ICommentPostDTO,
  ICommentPutDTO,
  ICommentDTO,
} from "../../types/ICommentDTO";
import ImageComponent from "../../components/Image.vue";
import ProfilesModal from "../../components/ProfilesModal.vue";
import Modal from "../../components/Modal.vue";
import PostsEditImage from "./EditImage.vue";
import { PostsApi } from "@/services/PostsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { CommentsApi } from "../../services/CommentsApi";
import { IFavoriteDTO } from "../../types/IFavoriteDTO";

import LoadingComponent from "../../components/shared/LoadingComponent.vue";

import PostSection from "./PostSection.vue";
import CommentsSection from "./CommentsSection.vue";
import IdentityStore from "../../components/shared/IdentityStore.vue";

@Component({
  components: {
    ImageComponent,
    ProfilesModal,
    PostsEditImage,
    Modal,
    PostSection,
    CommentsSection,
  },
})
export default class PostDetails extends IdentityStore {
  private comment: ICommentDTO | null = null;

  private postPutModel: IPostPutDTO = {
    id: this.post!.id,
    postTitle: this.post!.postTitle,
    postDescription: this.post!.postDescription,
  };

  private commentPutModel: ICommentPutDTO = {
    id: "",
    commentValue: "",
  };

  private commentPostModel: ICommentPostDTO = {
    postId: this.post!.id,
    commentValue: "",
  };

  private postEditing: boolean = false;
  private commentEditing: boolean = false;
  private imageEditing: boolean = false;
  private favorites: IFavoriteDTO[] | null = null;

  private pageToLoad = 2;
  private isFetching = false;

  get post(): IPostDTO | null {
    return store.state.selectedPost;
  }

  get editedComment() {
    return this.comment;
  }

  get comments() {
    return store.state.comments;
  }

  closePost() {
    if (!this.postEditing) {
      this.$emit("post-close");
    }
  }

  openImageEdit() {
    this.imageEditing = true;
  }

  closeImageEdit() {
    this.imageEditing = false;
  }

  openFavorites() {
    store
      .dispatch("getFavorites", { postId: this.post!.id, pageNumber: 1 })
      .then((response: IFavoriteDTO[]) => {
        this.favorites = response;
      });
  }

  closeFavorites() {
    this.favorites = null;
  }
}
</script>
