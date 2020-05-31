<template>
  <div>
    <h1>Index</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Profile (ID)</th>
          <th>Room (ID)</th>
          <th>Role (ID)</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.chatRoomId}}</td>
          <td>{{item.chatRoleId}}</td>
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

import { IChatMemberAdminDTO } from "@/types/IChatMemberDTO";

import { ChatMembersApi } from "@/services/admin/ChatMembersApi";

import IndexControls from "@/views/admin/components/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    IndexControls
  }
})
export default class CMIndexA extends Vue {
  private Model: IChatMemberAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onHistory(id: string) {
    ChatMembersApi.history(id, this.jwt).then(
      (response: IChatMemberAdminDTO[]) => {
        this.Model = response;
      }
    );
  }

  onEdit(id: string) {
    router.push({ name: "CMEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "CMDetailsA", params: { id } });
  }

  onDelete(id: string) {
    ChatMembersApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatMembersApi.index(this.jwt).then(
          (response: IChatMemberAdminDTO[]) => {
            this.Model = response;
          }
        );
      }
    });
  }

  onRestore(id: string) {
    ChatMembersApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatMembersApi.index(this.jwt).then(
          (response: IChatMemberAdminDTO[]) => {
            this.Model = response;
          }
        );
      }
    });
  }

  mounted() {
    ChatMembersApi.index(this.jwt).then((response: IChatMemberAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
