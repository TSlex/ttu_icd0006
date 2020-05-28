<template>
  <div class="modal_back" @click="closeModal">
    <ProfilesModal v-if="favorites" :profilesData="favorites" v-on:closeProfiles="closeFavorites" />
    <div class="post_details" @click.stop>
      <div class="post_details_post">
        <div class="post_image">
          <div v-if="isAuthenticated && currentUsername == post.profileUsername" class="post_controls">
            <template v-if="!postEditing">
              <a class="fa fa-edit mr-2 btn-link" href="#" @click="editPost(true)"></a>
              <a class="fa fa-times-circle btn-link" href="#" @click="deletePost"></a>
            </template>
            <template v-else>
              <a class="fa fa-check mr-2 btn-link" href="#" @click="putPost"></a>
              <a class="fa fa-times btn-link" href="#" @click="editPost(false)"></a>
            </template>
          </div>
          <ImageComponent :id="post.postImageId" :key="post.postImageId" height="unset" width="unset" />
        </div>

        <div class="post_details_meta_section">
          <template v-if="!postEditing">
            <p>{{post.postTitle}} by "{{post.profileUsername}}"</p>
            <span>{{post.postDescription}}</span>
          </template>
          <template v-else>
            <p>
              <input type="text" class="post_title text-center" v-model="postPutModel.postTitle" />
              by "{{post.profileUsername}}"
            </p>
            <textarea class="post_description text-center" rows="2" v-model="postPutModel.postDescription"></textarea>
          </template>

          <ul class="post_meta_section">
            <li class="post_meta">
              <span class="meta_title">{{post.postPublicationDateTime | formatDate}}</span>
            </li>
            <li class="post_meta" @click="openFavorites">
              <span class="meta_counter">{{post.postFavoritesCount}}&nbsp;</span>
              <span class="meta_title">favorites</span>
            </li>
            <li class="post_meta">
              <span class="meta_counter" v-if="comments.length">{{comments.length}}&nbsp;</span>
              <span class="meta_counter" v-else>{{post.postCommentsCount}}&nbsp;</span>
              <span class="meta_title">comments</span>
            </li>
            <li v-if="isAuthenticated">
              <a v-if="post.isFavorite" class="fas fa-heart" @click="unfavorite"></a>
              <a v-else class="far fa-heart" @click="favorite"></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="post_details_comments">
        <div class="post_comments_section">
          <a class="post_comment" v-for="comment in comments" :key="comment.id">
            <span class="comment_datetime">[{{comment.commentDateTime | formatTime}}]</span>
            <span class="comment_username">@{{comment.userName}}:</span>
            <span class="comment_value">&nbsp;{{comment.commentValue}}</span>
            <div
              v-if="!commentEditing
            || commentEditing && editedComment.id === comment.id"
              class="comment_controls"
            >
              <template v-if="!commentEditing && currentUsername === comment.userName">
                <a class="fa fa-edit btn-link mr-2" href="#" @click="editComment(comment)"></a>
                <a class="fa fa-times-circle btn-link" href="#" @click="deleteComment(comment)"></a>
              </template>
              <template v-else-if="!commentEditing && currentUsername === post.profileUsername">
                <a class="fa fa-times-circle btn-link" href="#" @click="deleteComment(comment)"></a>
              </template>
              <template v-if="commentEditing">
                <a class="fa fa-times btn-link" href="#" @click="setCommentEditing(false)"></a>
              </template>
            </div>
          </a>
          <a @click="loadMore" class="text-center btn-link">show more...</a>
        </div>
        <div class="row d-flex justify-content-center mt-3">
          <form v-if="isAuthenticated" class="chat_input">
            <template v-if="!commentEditing">
              <textarea rows="2" type="text" id="messageValue" v-model="commentModel.commentValue" />
              <button type="submit" class="far fa-paper-plane" @click="sendComment"></button>
            </template>
            <template v-else>
              <textarea rows="2" type="text" id="messageValue" v-model="commentPutModel.commentValue" />
              <button type="submit" class="far fa-paper-plane" @click="putComment"></button>
            </template>
          </form>
          <router-link v-else to="account/login">You must be signed in to leave comments. Sign in now?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import { IPostDTO, IPostPutDTO } from "../types/IPostDTO";
import {
  ICommentPostDTO,
  ICommentPutDTO,
  ICommentDTO
} from "../types/ICommentDTO";
import ImageComponent from "../components/Image.vue";
import ProfilesModal from "../components/ProfilesModal.vue";
import { PostsApi } from "@/services/PostsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { CommentsApi } from "../services/CommentsApi";
import { IFavoriteDTO } from "../types/IFavoriteDTO";

@Component({
  components: {
    ImageComponent,
    ProfilesModal
  }
})
export default class PostDetails extends Vue {
  @Prop()
  private post!: IPostDTO;

  private comment: ICommentDTO | null = null;

  private postPutModel: IPostPutDTO = {
    id: this.post.id,
    postTitle: this.post.postTitle,
    postDescription: this.post.postDescription
  };

  private commentPutModel: ICommentPutDTO = {
    id: "",
    commentValue: ""
  };

  private postEditing: boolean = false;
  private commentEditing: boolean = false;
  private favorites: IFavoriteDTO[] | null = null;

  closeModal() {
    if (!this.postEditing) {
      this.$emit("closePost");
    }
  }

  openFavorites() {
    store
      .dispatch("getFavorites", { postId: this.post.id, pageNumber: 1 })
      .then((response: IFavoriteDTO[]) => {
        this.favorites = response;
      });
  }

  closeFavorites() {
    this.favorites = null;
  }

  get editedComment() {
    return this.comment;
  }

  get comments() {
    return store.state.comments;
  }

  get jwt() {
    return store.getters.getJwt;
  }

  get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
  }

  get currentUsername(): string {
    return store.getters.getUserName;
  }

  setCommentEditing(mode: boolean) {
    this.commentEditing = mode;
  }

  editComment(comment: ICommentDTO) {
    this.comment = comment;
    this.commentEditing = true;
    this.commentPutModel.id = comment.id;
    this.commentPutModel.commentValue = comment.commentValue;
  }

  putComment(e: Event) {
    if (
      this.comment &&
      this.commentPutModel.id.length > 0 &&
      this.commentPutModel.commentValue.length > 0
    ) {
      this.postEditing = false;
      CommentsApi.putComment(
        this.commentPutModel.id,
        this.commentPutModel,
        this.jwt
      ).then((response: ResponseDTO) => {
        if (!response.errors) {
          this.comment!.commentValue = this.commentPutModel.commentValue;
        }
        this.setCommentEditing(false);
      });
    }

    e.preventDefault();
  }

  deleteComment(comment: ICommentDTO) {
    store.dispatch("deleteComment", comment);
    this.post.postCommentsCount -= 1;
  }

  editPost(mode: boolean) {
    this.postEditing = mode;
  }

  putPost() {
    if (
      this.post &&
      this.postPutModel.id.length > 0 &&
      this.postPutModel.postTitle.length > 0 &&
      this.postPutModel.postDescription.length > 0
    ) {
      this.postEditing = false;
      PostsApi.putPost(this.post.id, this.postPutModel, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors) {
            this.post.postTitle = this.postPutModel.postTitle;
            this.post.postDescription = this.postPutModel.postDescription;
          }
        }
      );
    }
  }

  deletePost() {
    PostsApi.deletePost(this.post.id, this.jwt).then(
      (response: ResponseDTO) => {
        this.$emit("closePost");
      }
    );
  }

  isUserComment(userName: string): boolean {
    return store.getters.getUserName === userName;
  }

  favorite() {
    if (this.post) {
      PostsApi.favorite(this.post.id, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.post) {
            this.post.isFavorite = true;
            this.post.postFavoritesCount += 1;
          }
        }
      );
    }
  }

  unfavorite() {
    if (this.post) {
      PostsApi.unfavorite(this.post.id, this.jwt).then(
        (response: ResponseDTO) => {
          if (!response.errors && this.post) {
            this.post.isFavorite = false;
            this.post.postFavoritesCount -= 1;
          }
        }
      );
    }
  }

  private pageToLoad = 2;
  private isFetching = false;
  private commentModel: ICommentPostDTO = {
    postId: this.post.id,
    commentValue: ""
  };

  sendComment(e: Event) {
    if (this.commentModel.commentValue !== "") {
      store.dispatch("postComment", this.commentModel).then(() => {
        this.commentModel.commentValue = "";
        this.post.postCommentsCount += 1;
      });
    }

    e.preventDefault();
  }

  loadMore(e: Event) {
    if (!this.isFetching) {
      this.isFetching = true;
      store
        .dispatch("getComments", {
          postId: this.post!.id,
          pageNumber: this.pageToLoad
        })
        .then(() => {
          this.isFetching = false;
          this.pageToLoad += 1;
        });
    }

    e.preventDefault();
  }

  created(): void {
    console.log("created");
    store.dispatch("setComments", { postId: this.post!.id, pageNumber: 1 });
  }
}
</script>
