<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.common.Id')}}</th>
          <th>{{$t('views.images.Preview')}}</th>
          <th>{{$t('bll.gifts.GiftName')}}</th>
          <th>{{$t('bll.gifts.GiftCode')}}</th>
          <th>{{$t('bll.gifts.Price')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.id}}</td>
          <td>
            <ImageComponent
              :id="item.giftImageId"
              htmlParentStyle="width: 5rem"
              height="unset"
              width="unset"
              htmlClass="card-img"
            />
          </td>
          <td>{{item.giftName}}</td>
          <td>{{item.giftCode}}</td>
          <td>{{item.price}}</td>
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

import { IGiftAdminDTO } from "@/types/IGiftDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { GiftsApi } from "@/services/admin/GiftsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

import ImageComponent from "@/components/Image.vue";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    IndexControls,
    ImageComponent,
  },
})
export default class GiftsIndexA extends AdminIndex<IGiftAdminDTO> {
  loadData() {
    this.isLoaded = false;

    GiftsApi.index(this.jwt).then((response: IGiftAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  onHistory(id: string) {
    GiftsApi.history(id, this.jwt).then((response: IGiftAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    GiftsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        GiftsApi.index(this.jwt).then((response: IGiftAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    GiftsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        GiftsApi.index(this.jwt).then((response: IGiftAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Gift";

    EventBus.$on("cultureUpdate", (culture: string) => {
      this.loadData();
    });
  }

  mounted() {
    this.loadData();
  }
}
</script>
