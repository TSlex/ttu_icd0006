<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:view-create="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.messages.ProfileId')}}</th>
          <th>{{$t('bll.messages.ChatRoomId')}}</th>
          <th>{{$t('bll.messages.MessageValue')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.chatRoomId}}</td>
          <td>{{item.messageValue}}</td>
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
import router from "@/router";

import { IMessageAdminDTO } from "@/types/IMessageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class MessagesIndexA extends AdminIndex<IMessageAdminDTO> {
  onHistory(id: string) {
    MessagesApi.history(id, this.jwt).then((response: IMessageAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    MessagesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        MessagesApi.index(this.jwt).then((response: IMessageAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    MessagesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        MessagesApi.index(this.jwt).then((response: IMessageAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Message";
  }

  mounted() {
    MessagesApi.index(this.jwt).then((response: IMessageAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
