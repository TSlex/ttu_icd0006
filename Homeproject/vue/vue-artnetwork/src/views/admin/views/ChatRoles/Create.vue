<template>
  <AdminCreateWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
  </AdminCreateWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminCreate from "@/views/admin/components/shared/base/AdminCreate.vue";

import CreateEdit from "./CreateEdit.vue";
import { createEmptyGuid } from "@/helpers/guid";
import { isGuid, requireError } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRolesCreateA extends AdminCreate {
  private model: IChatRoleAdminDTO = {
    roleTitle: "",
    roleTitleValue: "",
    roleTitleValueId: createEmptyGuid(),
    canRenameRoom: false,
    canEditMembers: false,
    canWriteMessages: false,
    canEditAllMessages: false,
    canEditMessages: false,
    id: createEmptyGuid(),
    masterId: null,
    createdBy: null,
    createdAt: new Date(),
    changedBy: null,
    changedAt: new Date(),
    deletedBy: null,
    deletedAt: null,
  };

  onSubmit() {
    this.errors = [];

    if (!(this.model.roleTitle.length > 0)) {
      this.errors.push(requireError("bll.chatroles.RoleTitle"));
    }
    if (!(this.model.roleTitleValue.length > 0)) {
      this.errors.push(requireError("bll.chatroles.RoleTitleValue"));
    }

    if (this.errors.length > 0) return;
    ChatRolesApi.create(this.model, this.jwt).then((response: ResponseDTO) => {
      if (response?.errors) {
        this.errors = response.errors;
      } else {
        this.$router.go(-1);
      }
    });
  }

  created() {
    this.modelName = "ChatRole";
  }

  mounted() {
    this.isLoaded = true;
  }
}
</script>
