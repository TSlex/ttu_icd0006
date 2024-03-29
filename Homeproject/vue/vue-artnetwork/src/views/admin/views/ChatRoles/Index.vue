<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:view-create="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>(ID)</th>
          <th>Title</th>
          <th>Title [{{CurrentCulture}}]</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.roleTitle}}</td>
          <td>{{item.roleTitleValue}}</td>
          <td>
            <IndexControls
              :model="item"
              v-on:view-edit="onEdit(item.id)"
              v-on:view-details="onDetails(item.id)"
              v-on:view-delete="onDelete(item.id)"
              v-on:view-restore="onRestore(item.id)"
              v-on:view-history="onHistory(item.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </AdminIndexWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";

import router from "@/router";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    IndexControls,
  },
})
export default class ChatRolesIndexA extends AdminIndex<IChatRoleAdminDTO> {
  get CurrentCulture() {
    return store.getters.getCurrentCulture;
  }

  loadData() {
    this.isLoaded = false;

    ChatRolesApi.index(this.jwt).then((response: IChatRoleAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  onHistory(id: string) {
    ChatRolesApi.history(id, this.jwt).then((response: IChatRoleAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    ChatRolesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRolesApi.index(this.jwt).then((response: IChatRoleAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ChatRolesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRolesApi.index(this.jwt).then((response: IChatRoleAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "ChatRole";

    EventBus.$on("culture-update", (culture: string) => {
      this.loadData();
    });
  }

  mounted() {
    this.loadData();
  }
}
</script>
