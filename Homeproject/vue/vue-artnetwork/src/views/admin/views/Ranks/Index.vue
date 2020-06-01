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
          <th>Next Rank (ID)</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id" :style="`color: ${item.rankTextColor}; background-color: ${item.rankColor}33`">
          <td>{{item.id}}</td>
          <td>{{item.rankTitle}}</td>
          <td>{{item.nextRankId}}</td>
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

import { IRankAdminDTO } from "@/types/IRankDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { RanksApi } from "@/services/admin/RanksApi";

import IndexControls from "@/views/admin/components/IndexControls.vue";

@Component({
  components: {
    IndexControls
  }
})
export default class RanksIndexA extends Vue {
  private Model: IRankAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "RanksCreateA" });
  }

  onHistory(id: string) {
    RanksApi.history(id, this.jwt).then((response: IRankAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "RanksEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "RanksDetailsA", params: { id } });
  }

  onDelete(id: string) {
    RanksApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        RanksApi.index(this.jwt).then((response: IRankAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    RanksApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        RanksApi.index(this.jwt).then((response: IRankAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    RanksApi.index(this.jwt).then((response: IRankAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
