<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="ProfileId">Профиль (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="Model.profileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="PostId">Пост (ID)</label>
      <input class="form-control" type="text" required id="PostId" name="PostId" v-model="Model.postId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="CommentValue">Комментарий</label>
      <textarea rows="5" class="form-control" id="CommentValue" maxlength="300" name="CommentValue" v-model="Model.commentValue"></textarea>
    </div>

    <div class="form-group">
      <label class="control-label" for="CommentDateTime">Дата комментария</label>
      <input
        class="form-control valid"
        type="datetime-local"
        id="CommentDateTime"
        name="CommentDateTime"
        v-model="Model.commentDateTime"
      />
    </div>
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { ICommentAdminDTO } from "@/types/ICommentDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component
export default class CommentsCreateA extends AdminCreate {
  private Model: ICommentAdminDTO = {
    id: "",
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    commentValue: "",
    commentDateTime: new Date(),
    profileId: "",
    postId: "",
  };

  submit() {
    if (
      this.Model.commentValue.length > 0 &&
      this.Model.profileId.length > 0 &&
      this.Model.postId.length > 0
    ) {
      CommentsApi.create(this.Model, this.jwt).then((response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      });
    }
  }
}
</script>
