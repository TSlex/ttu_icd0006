<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.common.Id')}}</th>
          <th>{{$t('bll.ranks.RankTitle')}}</th>
          <th>{{$t('bll.ranks.NextRankId')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id" :style="`color: ${item.rankTextColor}; background-color: ${item.rankColor}33`">
          <td>{{item.id}}</td>
          <td>{{item.rankTitle}}</td>
          <td>{{item.nextRankId}}</td>
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
  </AdminIndexWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IRankAdminDTO } from "@/types/IRankDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { RanksApi } from "@/services/admin/RanksApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "@/views/admin/components/shared/base/AdminIndex.vue";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    IndexControls,
  },
})
export default class RanksIndexA extends AdminIndex<IRankAdminDTO> {
  loadData() {
    this.isLoaded = false;

    RanksApi.index(this.jwt).then((response: IRankAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  onHistory(id: string) {
    RanksApi.history(id, this.jwt).then((response: IRankAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    RanksApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        RanksApi.index(this.jwt).then((response: IRankAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    RanksApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        RanksApi.index(this.jwt).then((response: IRankAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Rank";

    EventBus.$on("cultureUpdate", (culture: string) => {
      this.loadData();
    });
  }

  mounted() {
    this.loadData();
  }
}
</script>
