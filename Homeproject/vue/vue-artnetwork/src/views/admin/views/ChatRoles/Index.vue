<template>
  <div>
    <h1>Index</h1>
    <p>
      <a href="#" @click="onCreate" @click.prevent>Create New</a>
    </p>
    <table class="table">
      <thead>
        <tr>
          <th>(ID)</th>
          <th>Title</th>
          <th>Title [CULTURE]</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.roleTitle}}</td>
          <td>{{item.roleTitleValue}}</td>
          <td>{{item.deletedAt != null}}</td>
          <td>
            <IndexControls
              :model="item"
              v-on:onEdit="onEdit(item.id)"
              v-on:onDetails="onDetails(item.id)"
              v-on:onDelete="onDelete(item.id)"
              v-on:onRestore="onRestore(item.id)"
              v-on:onHistory="onHistory(item.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";

import router from "@/router";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class ChatRolesIndexA extends Vue {
  private Model: IChatRoleAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "ChatRolesCreateA" });
  }

  onHistory(id: string) {
    ChatRolesApi.history(id, this.jwt).then((response: IChatRoleAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "ChatRolesEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "ChatRolesDetailsA", params: { id } });
  }

  onDelete(id: string) {
    ChatRolesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRolesApi.index(this.jwt).then((response: IChatRoleAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ChatRolesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRolesApi.index(this.jwt).then((response: IChatRoleAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    ChatRolesApi.index(this.jwt).then((response: IChatRoleAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
