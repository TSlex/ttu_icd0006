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
          <label class="control-label" for="RoleTitle">Название</label>
          <input
            class="form-control"
            type="text"
            required
            id="RoleTitle"
            maxlength="200"
            name="RoleTitle"
            value="Member"
            v-model="Model.roleTitle"
          />
          <span class="text-danger field-validation-valid"></span>
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
          <span class="text-danger field-validation-valid"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CanRenameRoom">Может переменовывать чат?</label>
          <input
            type="checkbox"
            class="form-control"
            required
            id="CanRenameRoom"
            name="CanRenameRoom"
            value="true"
            v-model="Model.canRenameRoom"
          />
          <span class="text-danger field-validation-valid"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CanEditMembers">Может менять роли участников?</label>
          <input
            type="checkbox"
            class="form-control"
            required
            id="CanEditMembers"
            name="CanEditMembers"
            value="true"
            v-model="Model.canEditMembers"
          />
          <span class="text-danger field-validation-valid"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CanWriteMessages">Может писать в этот чат?</label>
          <input
            type="checkbox"
            class="form-control"
            required
            id="CanWriteMessages"
            name="CanWriteMessages"
            value="true"
            v-model="Model.canWriteMessages"
          />
          <span class="text-danger field-validation-valid"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CanEditAllMessages">Может редактировать все сообщения?</label>
          <input
            type="checkbox"
            class="form-control"
            required
            id="CanEditAllMessages"
            name="CanEditAllMessages"
            value="true"
            v-model="Model.canEditAllMessages"
          />
          <span class="text-danger field-validation-valid"></span>
        </div>

        <div class="form-group">
          <label class="control-label" for="CanEditMessages">Может редактировать свои сообщения?</label>
          <input
            type="checkbox"
            class="form-control"
            required
            id="CanEditMessages"
            name="CanEditMessages"
            value="true"
            v-model="Model.canEditMessages"
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

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

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
    deletedAt: null
  };

  private errors: string[] = [];

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
