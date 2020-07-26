<template>
  <div class="post_details_comments">
    <div class="post_comments_section" style="position: relative;">
      <template v-if="isLoaded">
        <a class="post_comment" v-for="(comment, index) in comments" :key="index">
          <span class="comment_datetime">[{{comment.commentDateTime | formatTime}}]</span>
          <span class="comment_username">@{{comment.userName}}:</span>
          <span class="comment_value">&nbsp;{{comment.commentValue}}</span>
          <div v-if="!commentEditing
            || commentEditing && editedComment.id === comment.id" class="comment_controls">
            <template v-if="!commentEditing && userName === comment.userName">
              <a class="fa fa-edit btn-link mr-2" href="#" @click="onEditComment(comment)"></a>
              <a class="fa fa-times-circle btn-link" href="#" @click="onDeleteComment(comment)"></a>
            </template>
            <template v-else-if="!commentEditing && userName === post.profileUsername">
              <a class="fa fa-times-circle btn-link" href="#" @click="onDeleteComment(comment)"></a>
            </template>
            <template v-if="commentEditing">
              <a class="fa fa-times btn-link" href="#" @click="onSetCommentEditing(false)"></a>
            </template>
          </div>
        </a>
        <a @click="onLoadMore" class="text-center btn-link">{{$t('views.comments.ShowMore')}}</a>
      </template>
      <LoadingOverlay :fixed="false" v-else />
    </div>
    <div class="row d-flex justify-content-center mt-3">
      <form v-if="isAuthenticated" class="chat_input">
        <template v-if="!commentEditing">
          <textarea rows="2" type="text" id="messageValue" v-model="commentPostModel.commentValue" />
          <button type="submit" class="far fa-paper-plane" @click="onSendComment"></button>
        </template>
        <template v-else>
          <textarea rows="2" type="text" id="messageValue" v-model="commentPutModel.commentValue" />
          <button type="submit" class="far fa-paper-plane" @click="onPutComment"></button>
        </template>
      </form>
      <div v-else class="col-10 text-center">
        <router-link to="/account/login">{{$t('views.comments.LoginRequired')}}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IdentityStore from "../../components/shared/IdentityStore.vue";
import store from "@/store";
import {
  ICommentDTO,
  ICommentPutDTO,
  ICommentPostDTO,
} from "@/types/ICommentDTO";
import { IPostDTO } from "../../types/IPostDTO";
import { CommentsApi } from "@/services/CommentsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import LoadingComponent from "../../components/shared/LoadingComponent.vue";
import moment from "moment";

@Component({
  components: {},
})
export default class CommentsSection extends LoadingComponent {
  private commentPutModel: ICommentPutDTO = {
    id: "",
    commentValue: "",
  };

  private commentPostModel: ICommentPostDTO = {
    postId: this.post!.id,
    commentValue: "",
  };

  private pageToLoad = 2;
  private isFetching = false;

  private comment: ICommentDTO | null = null;
  private commentEditing: boolean = false;

  get comments() {
    return store.getters.getComments;
  }

  get post(): IPostDTO | null {
    return store.state.selectedPost;
  }

  get editedComment() {
    return this.comment;
  }

  onSetCommentEditing(mode: boolean) {
    this.commentEditing = mode;
  }

  onEditComment(comment: ICommentDTO) {
    this.comment = comment;
    this.commentEditing = true;
    this.commentPutModel.id = comment.id;
    this.commentPutModel.commentValue = comment.commentValue;
  }

  onPutComment(e: Event) {
    if (
      this.comment &&
      this.commentPutModel.id.length > 0 &&
      this.commentPutModel.commentValue.length > 0
    ) {
      CommentsApi.putComment(
        this.commentPutModel.id,
        this.commentPutModel,
        this.jwt
      ).then((response: ResponseDTO) => {
        if (!response.errors) {
          this.comment!.commentValue = this.commentPutModel.commentValue;
        }
        this.onSetCommentEditing(false);
      });
    }

    e.preventDefault();
  }

  onDeleteComment(comment: ICommentDTO) {
    store.dispatch("deleteComment", comment);
    this.post!.postCommentsCount -= 1;
  }

  onSendComment(e: Event) {
    if (this.commentPostModel.commentValue !== "") {
      store.dispatch("postComment", {
        ...this.commentPostModel,
      });
      store.commit("setComments", [
        {
          ...this.commentPostModel,
          userName: this.userName,
          commentDateTime: new Date().toISOString(),
        },
        ...this.comments,
      ]);
      this.post!.postCommentsCount += 1;
      this.commentPostModel.commentValue = "";
    }

    e.preventDefault();
  }

  onLoadMore(e: Event) {
    if (!this.isFetching) {
      this.isFetching = true;
      store
        .dispatch("getComments", {
          postId: this.post!.id,
          pageNumber: this.pageToLoad,
        })
        .then(() => {
          this.isFetching = false;
          this.pageToLoad += 1;
        });
    }

    e.preventDefault();
  }

  created(): void {
    store
      .dispatch("setComments", { postId: this.post!.id, pageNumber: 1 })
      .then(() => {
        this.isLoaded = true;
      });
  }
}
</script>

<style>
</style>
