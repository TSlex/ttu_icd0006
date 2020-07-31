<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit />
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IMessageAdminDTO } from "@/types/IMessageDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    CreateEdit,
  },
})
export default class MessagesCreateA extends AdminCreate {
  private model: IMessageAdminDTO = {
    id: "",
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    profileId: "",
    chatRoomId: "",
    messageValue: "",
    messageDateTime: new Date(),
  };

  submit() {
    if (
      this.model.messageValue.length > 0 &&
      this.model.profileId.length > 0 &&
      this.model.chatRoomId.length > 0
    ) {
      MessagesApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
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
