<template>
  <div class="modal_back" @click.prevent="$emit('closePost')">
    <div class="post_details" @click.stop>
      <div class="post_details_post">
        <div class="post_image">
          <div v-if="isAuthenticated" class="post_controls">
            <a class="fa fa-edit" href="/posts/edit/08d7f4fc-ba4e-45bf-85fd-ab5cd7a78f02"></a>
            <a class="fa fa-times-circle" href="/posts/delete/08d7f4fc-ba4e-45bf-85fd-ab5cd7a78f02"></a>
          </div>
          <img :src="post.postImageUrl" alt />
        </div>

        <div class="post_details_meta_section">
          <p>{{post.postTitle}} by "{{post.profileUsername}}"</p>
          <span>{{post.postDescription}}</span>
          <ul class="post_meta_section">
            <li class="post_meta">
              <span class="meta_title">{{post.postPublicationDateTime | formatDate}}</span>
            </li>
            <li class="post_meta">
              <span class="meta_counter">{{post.postFavoritesCount}}&nbsp;</span>
              <span class="meta_title">favorites</span>
            </li>
            <li class="post_meta">
              <span class="meta_counter">{{post.postCommentsCount}}&nbsp;</span>
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
            <div v-if="isUserComment(comment.userName)" class="comment_controls">
              <a class="fa fa-edit"></a>
              <a class="fa fa-times-circle"></a>
            </div>
          </a>
          <a @click="loadMore" class="text-center text-primary">show more...</a>
        </div>
        <div class="row d-flex justify-content-center mt-3">
          <form v-if="isAuthenticated" class="chat_input">
            <textarea rows="2" type="text" id="messageValue" v-model="commentModel.commentValue" />
            <button type="submit" class="far fa-paper-plane" @click="sendComment"></button>
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
import { IPostDTO } from "../types/IPostDTO";
import { ICommentPostDTO } from "../types/ICommentDTO";
import { PostsApi } from "@/services/PostsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component
export default class PostDetails extends Vue {
  @Prop()
  private post!: IPostDTO;

  get comments() {
    return store.state.comments;
  }

  get jwt() {
    return store.getters.getJwt;
  }

  get isAuthenticated(): boolean {
    return store.getters.isAuthenticated;
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
