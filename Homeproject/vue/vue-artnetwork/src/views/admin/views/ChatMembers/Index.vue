<template>
  <AdminIndexWrapper v-if="isLoaded">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.chatmembers.ProfileId')}}</th>
          <th>{{$t('bll.chatmembers.ChatRoomId')}}</th>
          <th>{{$t('bll.chatmembers.ChatRoleId')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.chatRoomId}}</td>
          <td>{{item.chatRoleId}}</td>
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

import { IChatMemberAdminDTO } from "@/types/IChatMemberDTO";

import { ChatMembersApi } from "@/services/admin/ChatMembersApi";

import router from "../../../../router";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class CMIndexA extends AdminIndex<IChatMemberAdminDTO> {
  onHistory(id: string) {
    ChatMembersApi.history(id, this.jwt).then(
      (response: IChatMemberAdminDTO[]) => {
        this.model = response;
      }
    );
  }

  onDelete(id: string) {
    ChatMembersApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ChatMembersApi.index(this.jwt).then(
          (response: IChatMemberAdminDTO[]) => {
            this.model = response;
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
            this.model = response;
          }
        );
      }
    });
  }

  created() {
    this.modelName = "ChatMember";
  }

  mounted() {
    ChatMembersApi.index(this.jwt).then((response: IChatMemberAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
