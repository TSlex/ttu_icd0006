<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
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
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { ICommentAdminDTO } from "@/types/ICommentDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component
export default class CommentsEditA extends AdminEdit<ICommentAdminDTO> {
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
