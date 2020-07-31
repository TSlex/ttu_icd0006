<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
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

@Component({
  components: {
    CreateEdit,
  },
})
export default class ChatRolesEditA extends AdminEdit<IChatRoleAdminDTO> {
  mounted() {
    ChatRolesApi.details(this.Id, this.jwt).then(
      (response: IChatRoleAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }

  onSubmit() {
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
