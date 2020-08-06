<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
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
import CreateEdit from "./CreateEdit.vue";
import { requireError, isGuid } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class CommentsEditA extends AdminEdit<ICommentAdminDTO> {
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
    CommentsApi.edit(this.Id, this.model!, this.jwt).then(
      (response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      }
    );
  }

  created() {
    this.modelName = "Comment";
  }

  mounted() {
    CommentsApi.details(this.Id, this.jwt).then(
      (response: ICommentAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
