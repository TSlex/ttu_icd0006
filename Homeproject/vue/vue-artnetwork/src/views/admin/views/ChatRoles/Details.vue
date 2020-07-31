<template>
  <AdminDetailsWrapper v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">(ID)</dt>
      <dd class="col-sm-10">{{model.id}}</dd>

      <dt class="col-sm-2">Title</dt>
      <dd class="col-sm-10">{{model.roleTitle}}</dd>

      <dt class="col-sm-2">Title [CULTURE]</dt>
      <dd class="col-sm-10">{{model.roleTitleValue}}</dd>

      <dt class="col-sm-2">Can rename room?</dt>
      <dd class="col-sm-10">{{model.canRenameRoom}}</dd>

      <dt class="col-sm-2">Can edit members?</dt>
      <dd class="col-sm-10">{{model.canEditMembers}}</dd>

      <dt class="col-sm-2">Can write messages?</dt>
      <dd class="col-sm-10">{{model.canWriteMessages}}</dd>

      <dt class="col-sm-2">Can edit all messages?</dt>
      <dd class="col-sm-10">{{model.canEditAllMessages}}</dd>

      <dt class="col-sm-2">Can edit own messages?</dt>
      <dd class="col-sm-10">{{model.canEditMessages}}</dd>

      <dt class="col-sm-2">CreatedBy</dt>
      <dd class="col-sm-10">{{model.createdBy}}</dd>

      <dt class="col-sm-2">CreatedAt</dt>
      <dd class="col-sm-10">{{model.createdAt}}</dd>

      <dt class="col-sm-2">ChangedBy</dt>
      <dd class="col-sm-10">{{model.changedBy}}</dd>

      <dt class="col-sm-2">ChangedAt</dt>
      <dd class="col-sm-10">{{model.changedAt}}</dd>

      <dt class="col-sm-2">DeletedBy</dt>
      <dd class="col-sm-10">{{model.deletedBy}}</dd>

      <dt class="col-sm-2">DeletedAt</dt>
      <dd class="col-sm-10">{{model.deletedAt}}</dd>
    </dl>
  </AdminDetailsWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";

@Component
export default class ChatRolesDetailsA extends AdminDetails<IChatRoleAdminDTO> {
  mounted() {
    ChatRolesApi.details(this.Id, this.jwt).then(
      (response: IChatRoleAdminDTO) => {
        this.model = response;
      }
    );
  }
}
</script>
