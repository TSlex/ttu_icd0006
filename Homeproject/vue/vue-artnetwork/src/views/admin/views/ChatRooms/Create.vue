<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "../../../../helpers/guid";
import { requireError } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRoomsCreateA extends AdminCreate {
  private model: IChatRoomAdminDTO = {
    id: createEmptyGuid(),
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
    chatRoomTitle: "",
    chatRoomImageUrl: null,
    chatRoomImageId: null,
  };

  onSubmit() {
    this.errors = [];

    if (!(this.model.chatRoomTitle.length > 0)) {
      this.errors.push(requireError("bll.chatrooms.ChatRoomTitle"));
    }

    if (this.errors.length > 0) return;
    ChatRoomsApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
  }

  created() {
    this.modelName = "ChatRoom";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
