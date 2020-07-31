<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="ProfileId">Профиль (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="ChatRoomId">Комната (ID)</label>
      <input class="form-control" type="text" required id="ChatRoomId" name="ChatRoomId" v-model="model.chatRoomId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="ChatRoomId" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="MessageValue">Сообщение</label>
      <input
        class="form-control"
        type="text"
        required
        id="MessageValue"
        maxlength="3000"
        name="MessageValue"
        v-model="model.messageValue"
      />
      <span class="text-danger field-validation-valid" data-valmsg-for="MessageValue" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="MessageDateTime">Дата сообщения</label>
      <input
        class="form-control"
        type="datetime-local"
        required
        id="MessageDateTime"
        name="MessageDateTime"
        v-model="model.messageDateTime"
      />
      <span class="text-danger field-validation-valid" data-valmsg-for="MessageDateTime" data-valmsg-replace="true"></span>
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IMessageAdminDTO } from "@/types/IMessageDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component
export default class MessagesEditA extends AdminEdit<IMessageAdminDTO> {
  mounted() {
    MessagesApi.details(this.Id, this.jwt).then(
      (response: IMessageAdminDTO) => {
        this.model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.model) {
      MessagesApi.edit(this.Id, this.model, this.jwt).then(
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
