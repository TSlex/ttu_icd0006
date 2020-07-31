<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.messages.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.messages.ChatRoomId')}}</dt>
      <dd class="col-sm-10">{{model.chatRoomId}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.messages.MessageValue')}}</dt>
      <dd class="col-sm-10">{{model.messageValue}}</dd>

      <dt class="col-sm-2">{{$t('bll.messages.MessageDateTime')}}</dt>
      <dd class="col-sm-10">{{model.messageDateTime}}</dd>
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

import { IMessageAdminDTO } from "@/types/IMessageDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class MessagesDetailsA extends AdminDetails<IMessageAdminDTO> {
  created() {
    this.modelName = "Message";
  }

  mounted() {
    MessagesApi.details(this.Id, this.jwt).then(
      (response: IMessageAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
