<template>
  <div v-if="Id && Model">
    <h1>Details</h1>

    <div>
      <h4>ChatRole</h4>
      <hr />
      <dl class="row">
        <dt class="col-sm-2">(ID)</dt>
        <dd class="col-sm-10">{{Model.id}}</dd>

        <dt class="col-sm-2">Title</dt>
        <dd class="col-sm-10">{{Model.roleTitle}}</dd>

        <dt class="col-sm-2">Title [CULTURE]</dt>
        <dd class="col-sm-10">{{Model.roleTitleValue}}</dd>

        <dt class="col-sm-2">Can rename room?</dt>
        <dd class="col-sm-10">{{Model.canRenameRoom}}</dd>

        <dt class="col-sm-2">Can edit members?</dt>
        <dd class="col-sm-10">{{Model.canEditMembers}}</dd>

        <dt class="col-sm-2">Can write messages?</dt>
        <dd class="col-sm-10">{{Model.canWriteMessages}}</dd>

        <dt class="col-sm-2">Can edit all messages?</dt>
        <dd class="col-sm-10">{{Model.canEditAllMessages}}</dd>

        <dt class="col-sm-2">Can edit own messages?</dt>
        <dd class="col-sm-10">{{Model.canEditMessages}}</dd>

        <dt class="col-sm-2">CreatedBy</dt>
        <dd class="col-sm-10">{{Model.createdBy}}</dd>

        <dt class="col-sm-2">CreatedAt</dt>
        <dd class="col-sm-10">{{Model.createdAt}}</dd>

        <dt class="col-sm-2">ChangedBy</dt>
        <dd class="col-sm-10">{{Model.changedBy}}</dd>

        <dt class="col-sm-2">ChangedAt</dt>
        <dd class="col-sm-10">{{Model.changedAt}}</dd>

        <dt class="col-sm-2">DeletedBy</dt>
        <dd class="col-sm-10">{{Model.deletedBy}}</dd>

        <dt class="col-sm-2">DeletedAt</dt>
        <dd class="col-sm-10">{{Model.deletedAt}}</dd>
      </dl>
    </div>
    <div>
      <button class="btn btn-primary mr-1" @click="onEdit(Model.id)">Edit</button>
      <button class="btn btn-primary" @click="$router.go(-1)">Back to List</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component
export default class ChatRolesDetailsA extends Vue {
  @Prop()
  private id!: string;

  private Model: IChatRoleAdminDTO | null = null;

  private errors: string[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get Id() {
    return this.id;
  }

  onEdit(id: string) {
    router.push({ name: "ChatRolesEditA", params: { id } });
  }

  mounted() {
    ChatRolesApi.details(this.Id, this.jwt).then(
      (response: IChatRoleAdminDTO) => {
        this.Model = response;
      }
    );
  }
}
</script>
