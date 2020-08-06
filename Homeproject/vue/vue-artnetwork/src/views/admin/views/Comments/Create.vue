<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { ICommentAdminDTO } from "@/types/ICommentDTO";

import { CommentsApi } from "@/services/admin/CommentsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "../../../../helpers/guid";
import { isGuid, requireError } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class CommentsCreateA extends AdminCreate {
  private model: ICommentAdminDTO = {
    id: createEmptyGuid(),
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

  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.comments.ProfileId"));
    }
    if (!isGuid(this.model!.postId)) {
      this.errors.push(requireError("bll.comments.PostId"));
    }
    if (!(this.model!.commentValue.length > 0)) {
      this.errors.push(requireError("bll.comments.CommentValue"));
    }
    if (!this.model!.commentDateTime) {
      this.errors.push(requireError("bll.comments.CommentDateTime"));
    }
    if (this.errors.length > 0) return;

    CommentsApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
  }

  created() {
    this.modelName = "Comment";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
