<template>
  <div>
    <h1 class="text-center">Create</h1>
    <hr />
    <div class="row text-center justify-content-center">
      <div class="col-md-4">
        <div class="text-danger validation-summary-valid" data-valmsg-summary="true">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
          </ul>
        </div>

        <div class="form-group">
          <label class="control-label" for="ProfileId">Профиль (ID)</label>
          <input
            class="form-control"
            type="text"
            required
            id="ProfileId"
            name="ProfileId"
            v-model="Model.profileId"
          />
          <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
        </div>
        <div class="form-group">
          <label class="control-label" for="ChatRoomId">Комната (ID)</label>
          <input
            class="form-control"
            type="text"
            required
            id="ChatRoomId"
            name="ChatRoomId"
            v-model="Model.chatRoomId"
          />
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
            v-model="Model.messageValue"
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
            v-model="Model.messageDateTime"
          />
          <span class="text-danger field-validation-valid" data-valmsg-for="MessageDateTime" data-valmsg-replace="true"></span>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="submit">Submit</button>
          <button class="btn btn-secondary" @click="$router.go(-1)">Back to List</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IMessageAdminDTO } from "@/types/IMessageDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component
export default class MessagesCreateA extends Vue {
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

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

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
