<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";
import CreateEdit from "./CreateEdit.vue";
import { requireError } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRoomsEditA extends AdminEdit<IChatRoomAdminDTO> {
  onSubmit() {
    this.errors = [];

    if (!(this.model!.chatRoomTitle.length > 0)) {
      this.errors.push(requireError("bll.chatrooms.ChatRoomTitle"));
    }

    if (this.errors.length > 0) return;
    ChatRoomsApi.edit(this.Id, this.model!, this.jwt).then(
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
    this.modelName = "ChatRoom";
  }

  mounted() {
    ChatRoomsApi.details(this.Id, this.jwt).then(
      (response: IChatRoomAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
