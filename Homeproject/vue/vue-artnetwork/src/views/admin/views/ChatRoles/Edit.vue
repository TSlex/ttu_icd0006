<template>
  <AdminEditWrapper v-if="isLoaded" v-on:model-submit="onSubmit" v-on:back-to-list="onBackToList" :errors="errors">
    <CreateEdit :model="model" />
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

import CreateEdit from "./CreateEdit.vue";
import { isGuid, requireError } from "@/translations/validation";

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRolesEditA extends AdminEdit<IChatRoleAdminDTO> {
  onSubmit() {
    this.errors = [];

    if (!(this.model!.roleTitle.length > 0)) {
      this.errors.push(requireError("bll.chatroles.RoleTitle"));
    }
    if (!(this.model!.roleTitleValue.length > 0)) {
      this.errors.push(requireError("bll.chatroles.RoleTitleValue"));
    }
    if (this.errors.length > 0) return;

    ChatRolesApi.edit(this.Id, this.model!, this.jwt).then(
      (response: ResponseDTO) => {
        if (response?.errors) {
          this.errors = response.errors;
        } else {
          this.$router.go(-1);
        }
      }
    );
  }

  created() {
    this.modelName = "ChatRole";
  }

  mounted() {
    ChatRolesApi.details(this.Id, this.jwt).then(
      (response: IChatRoleAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
