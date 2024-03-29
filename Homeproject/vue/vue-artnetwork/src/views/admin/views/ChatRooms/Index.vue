<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:view-create="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t("bll.common.Id")}}</th>
          <th>{{$t("bll.chatrooms.ChatRoomTitle")}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.chatRoomTitle}}</td>
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

import { IChatRoomAdminDTO } from "@/types/IChatRoomDTO";

import { ChatRoomsApi } from "@/services/admin/ChatRoomsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class ChatRoomsIndexA extends AdminIndex<IChatRoomAdminDTO> {
  onHistory(id: string) {
    ChatRoomsApi.history(id, this.jwt).then((response: IChatRoomAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    ChatRoomsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRoomsApi.index(this.jwt).then((response: IChatRoomAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ChatRoomsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatRoomsApi.index(this.jwt).then((response: IChatRoomAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "ChatRoom";
  }

  mounted() {
    ChatRoomsApi.index(this.jwt).then((response: IChatRoomAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
