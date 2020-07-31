<template>
  <div>
    <h1>Index</h1>
    <p>
      <a href="#" @click="onCreate" @click.prevent>Create New</a>
    </p>
    <table class="table">
      <thead>
        <tr>
          <th>Profile (ID)</th>
          <th>Room (ID)</th>
          <th>Value</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.chatRoomId}}</td>
          <td>{{item.messageValue}}</td>
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
import router from "@/router";

import { IMessageAdminDTO } from "@/types/IMessageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { MessagesApi } from "@/services/admin/MessagesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class MessagesIndexA extends Vue {
  private Model: IMessageAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "MessagesCreateA" });
  }

  onHistory(id: string) {
    MessagesApi.history(id, this.jwt).then((response: IMessageAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "MessagesEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "MessagesDetailsA", params: { id } });
  }

  onDelete(id: string) {
    MessagesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        MessagesApi.index(this.jwt).then((response: IMessageAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    MessagesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        MessagesApi.index(this.jwt).then((response: IMessageAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    MessagesApi.index(this.jwt).then((response: IMessageAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
