<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:view-edit="onEdit" v-on:back-to-list="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">{{$t('bll.chatmembers.ProfileId')}}</dt>
      <dd class="col-sm-10">{{model.profileId}}</dd>

      <dt class="col-sm-2">{{$t('bll.chatmembers.ChatRoomId')}}</dt>
      <dd class="col-sm-10">{{model.chatRoomId}}</dd>

      <dt class="col-sm-2">{{$t('bll.chatmembers.ChatRoleId')}}</dt>
      <dd class="col-sm-10">{{model.chatRoleId}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.chatmembers.ChatRoomTitle')}}</dt>
      <dd class="col-sm-10">{{model.chatRoomTitle}}</dd>
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

import { IChatMemberAdminDTO } from "@/types/IChatMemberDTO";

import { ChatMembersApi } from "@/services/admin/ChatMembersApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class CMDetailsA extends AdminDetails<IChatMemberAdminDTO> {
  created() {
    this.modelName = "ChatMember";
  }

  mounted() {
    ChatMembersApi.details(this.Id, this.jwt).then(
      (response: IChatMemberAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
