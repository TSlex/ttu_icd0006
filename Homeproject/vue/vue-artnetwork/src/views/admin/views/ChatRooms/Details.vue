<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.chatrooms.ChatRoomTitle')}}</dt>
      <dd class="col-sm-10">{{model.chatRoomTitle}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.chatrooms.ChatRoomImageId')}}</dt>
      <dd class="col-sm-10">{{model.chatRoomImageId}}</dd>

      <dt class="col-sm-2">{{$t('bll.chatrooms.LastMessageValue')}}</dt>
      <dd class="col-sm-10">{{model.lastMessageValue}}</dd>

      <dt class="col-sm-2">{{$t('bll.chatrooms.LastMessageDateTime')}}</dt>
      <dd class="col-sm-10">{{model.lastMessageDateTime}}</dd>
    </dl>
    <hr />

    <MetaDetailsSection :model="model" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class ChatRoomsDetailsA extends AdminDetails<IChatRoomAdminDTO> {
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
