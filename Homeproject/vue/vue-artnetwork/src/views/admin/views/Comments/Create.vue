<template>
  <div>
    <h1 class="text-center">Create</h1>
    <hr />
    <div class="row text-center justify-content-center">
      <div class="col-md-4">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>

        <div class="form-group">
          <label class="control-label" for="ProfileId">Профиль (ID)</label>
          <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="Model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="PostId">Пост (ID)</label>
          <input class="form-control" type="text" required id="PostId" name="PostId" v-model="Model.postId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="PostId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CommentValue">Комментарий</label>
          <textarea
            rows="5"
            class="form-control"
            required
            id="CommentValue"
            maxlength="300"
            name="CommentValue"
            v-model="Model.commentValue"
          ></textarea>
          <span class="text-danger field-validation-valid" data-valmsg-for="CommentValue" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CommentDateTime">Дата комментария</label>
          <input
            class="form-control valid"
            type="datetime-local"
            required
            id="CommentDateTime"
            name="CommentDateTime"
            v-model="Model.commentDateTime"
          />
          <span class="text-danger field-validation-valid" data-valmsg-for="CommentDateTime" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Submit</button>
          <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { ICommentAdminDTO } from "@/types/ICommentDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component
export default class CommentsCreateA extends Vue {
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
    postId: ""
  };

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

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
