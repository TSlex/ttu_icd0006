<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="RoleTitle">Название</label>
      <input
        class="form-control"
        type="text"
        id="RoleTitle"
        maxlength="200"
        name="RoleTitle"
        value="Member"
        v-model="Model.roleTitle"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="RoleTitleValue">Переведенное название [ru-RU]</label>
      <input
        class="form-control"
        type="text"
        id="RoleTitleValue"
        name="RoleTitleValue"
        value="Участник"
        v-model="Model.roleTitleValueId"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanRenameRoom">Может переменовывать чат?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanRenameRoom"
        name="CanRenameRoom"
        value="true"
        v-model="Model.canRenameRoom"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditMembers">Может менять роли участников?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditMembers"
        name="CanEditMembers"
        value="true"
        v-model="Model.canEditMembers"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanWriteMessages">Может писать в этот чат?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanWriteMessages"
        name="CanWriteMessages"
        value="true"
        v-model="Model.canWriteMessages"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditAllMessages">Может редактировать все сообщения?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditAllMessages"
        name="CanEditAllMessages"
        value="true"
        v-model="Model.canEditAllMessages"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditMessages">Может редактировать свои сообщения?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditMessages"
        name="CanEditMessages"
        value="true"
        v-model="Model.canEditMessages"
      />
    </div>
  </AdminCreateWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";

@Component
export default class ChatRolesCreateA extends AdminCreate {
  private Model: IChatRoleAdminDTO = {
    roleTitle: "",
    roleTitleValueId: "",
    canRenameRoom: false,
    canEditMembers: false,
    canWriteMessages: false,
    canEditAllMessages: false,
    canEditMessages: false,
    id: "",
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
  };

  get jwt() {
    return store.getters.getJwt;
  }

  submit() {
    if (
      this.Model.roleTitle.length > 0 &&
      this.Model.roleTitleValueId.length > 0
    ) {
      ChatRolesApi.create(this.Model, this.jwt).then(
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
