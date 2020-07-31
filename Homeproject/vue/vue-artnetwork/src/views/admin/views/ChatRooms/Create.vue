<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit />
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRoomsCreateA extends AdminCreate {
  private Model: IChatRoomAdminDTO = {
    id: "",
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

  submit() {
    if (this.Model.chatRoomTitle.length > 0) {
      ChatRoomsApi.create(this.Model, this.jwt).then(
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
