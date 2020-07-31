<template>
  <div v-if="Id && model">
    <h1 class="text-center">Edit</h1>
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
          <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="PostId">Пост (ID)</label>
          <input class="form-control" type="text" required id="PostId" name="PostId" v-model="model.postId" />
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
            v-model="model.commentValue"
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
            v-model="model.commentDateTime"
          />
          <span class="text-danger field-validation-valid" data-valmsg-for="CommentDateTime" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Save</button>
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
export default class CommentsEditA extends Vue {
  @Prop()
  private id!: string;

  private model: ICommentAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  mounted() {
    CommentsApi.details(this.Id, this.jwt).then(
      (response: ICommentAdminDTO) => {
        this.model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.model) {
      CommentsApi.edit(this.Id, this.model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }
}
</script>
