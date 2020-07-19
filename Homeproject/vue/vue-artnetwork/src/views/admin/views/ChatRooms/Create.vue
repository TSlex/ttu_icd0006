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
          <label class="control-label" for="RoomTitle">Title</label>
          <input
            class="form-control"
            type="text"
            required
            id="RoomTitle"
            maxlength="100"
            name="RoomTitle"
            v-model="Model.chatRoomTitle"
          />
          <span class="text-danger field-validation-valid"></span>
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

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component
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
    chatRoomImageId: null
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
