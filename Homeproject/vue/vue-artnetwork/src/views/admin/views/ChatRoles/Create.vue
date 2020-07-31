<template>
  <AdminCreateWrapper v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <CreateEdit />
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

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRolesCreateA extends AdminCreate {
  private model: IChatRoleAdminDTO = {
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

  onSubmit() {
    if (
      this.model.roleTitle.length > 0 &&
      this.model.roleTitleValueId.length > 0
    ) {
      ChatRolesApi.create(this.model, this.jwt).then(
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
