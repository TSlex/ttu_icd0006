<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IMessageAdminDTO } from "@/types/IMessageDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";
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
export default class MessagesCreateA extends AdminCreate {
  private model: IMessageAdminDTO = {
    id: createEmptyGuid(),
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

  onSubmit() {
    this.errors = [];

    if (!isGuid(this.model!.profileId)) {
      this.errors.push(requireError("bll.messages.ProfileId"));
    }
    if (!isGuid(this.model!.chatRoomId)) {
      this.errors.push(requireError("bll.messages.ChatRoomId"));
    }
    if (!this.model!.messageValue) {
      this.errors.push(requireError("bll.messages.MessageValue"));
    }
    if (!this.model!.messageDateTime) {
      this.errors.push(requireError("bll.messages.MessageDateTime"));
    }
    if (this.errors.length > 0) return;

    MessagesApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
  }

  created() {
    this.modelName = "Message";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
