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
          <th>Code</th>
          <th>Title</th>
          <th>Price</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.giftCode}}</td>
          <td>{{item.giftName}}</td>
          <td>{{item.price}}</td>
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

import { IGiftAdminDTO } from "@/types/IGiftDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { GiftsApi } from "@/services/admin/GiftsApi";

import IndexControls from "@/views/admin/components/IndexControls.vue";

@Component({
  components: {
    IndexControls
  }
})
export default class GiftsIndexA extends Vue {
  private Model: IGiftAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "GiftsCreateA" });
  }

  onHistory(id: string) {
    GiftsApi.history(id, this.jwt).then((response: IGiftAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "GiftsEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "GiftsDetailsA", params: { id } });
  }

  onDelete(id: string) {
    GiftsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        GiftsApi.index(this.jwt).then((response: IGiftAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    GiftsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        GiftsApi.index(this.jwt).then((response: IGiftAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    GiftsApi.index(this.jwt).then((response: IGiftAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
