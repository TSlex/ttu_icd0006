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
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.chatRoomTitle}}</td>
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

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

@Component({
  components: {
    IndexControls
  }
})
export default class ChatRoomsIndexA extends Vue {
  private Model: IChatRoomAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "ChatRoomsCreateA" });
  }

  onHistory(id: string) {
    ChatRoomsApi.history(id, this.jwt).then((response: IChatRoomAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "ChatRoomsEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "ChatRoomsDetailsA", params: { id } });
  }

  onDelete(id: string) {
    ChatRoomsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRoomsApi.index(this.jwt).then((response: IChatRoomAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ChatRoomsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRoomsApi.index(this.jwt).then((response: IChatRoomAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    ChatRoomsApi.index(this.jwt).then((response: IChatRoomAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
