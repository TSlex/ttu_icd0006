<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="ProfileId">Профиль (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="Model.profileId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="ChatRoomId">Комната (ID)</label>
      <input class="form-control" type="text" required id="ChatRoomId" name="ChatRoomId" v-model="Model.chatRoomId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="MessageValue">Сообщение</label>
      <input class="form-control" type="text" id="MessageValue" maxlength="3000" name="MessageValue" v-model="Model.messageValue" />
    </div>
    <div class="form-group">
      <label class="control-label" for="MessageDateTime">Дата сообщения</label>
      <input
        class="form-control"
        type="datetime-local"
        required
        id="MessageDateTime"
        name="MessageDateTime"
        v-model="Model.messageDateTime"
      />
    </div>
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

@Component
export default class MessagesCreateA extends AdminCreate {
  private Model: IMessageAdminDTO = {
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
      this.Model.messageValue.length > 0 &&
      this.Model.profileId.length > 0 &&
      this.Model.chatRoomId.length > 0
    ) {
      MessagesApi.create(this.Model, this.jwt).then((response: ResponseDTO) => {
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
