<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
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
        v-model="model.roleTitle"
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
        v-model="model.roleTitleValueId"
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
        v-model="model.canRenameRoom"
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
        v-model="model.canEditMembers"
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
        v-model="model.canWriteMessages"
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
        v-model="model.canEditAllMessages"
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
        v-model="model.canEditMessages"
      />
      <span class="text-danger field-validation-valid"></span>
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component
export default class ChatRolesEditA extends AdminEdit<IChatRoleAdminDTO> {
  mounted() {
    ChatRolesApi.details(this.Id, this.jwt).then(
      (response: IChatRoleAdminDTO) => {
        this.model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.model) {
      ChatRolesApi.edit(this.Id, this.model, this.jwt).then(
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
