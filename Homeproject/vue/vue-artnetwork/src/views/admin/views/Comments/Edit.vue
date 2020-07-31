<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
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

@Component({
  components: {
    CreateEdit,
  },
})
export default class CommentsEditA extends AdminEdit<ICommentAdminDTO> {
  onSubmit() {
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
