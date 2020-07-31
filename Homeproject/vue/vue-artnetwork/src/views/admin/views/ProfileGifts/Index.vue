<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.profilegifts.ProfileId')}}</th>
          <th>{{$t('bll.profilegifts.GiftId')}}</th>
          <th>{{$t('views.images.Preview')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.profileId}}</td>
          <td>{{item.giftId}}</td>
          <td>
            <ImageComponent
              :id="item.giftId"
              :loadGift="true"
              htmlParentStyle="width: 5rem"
              height="unset"
              width="unset"
              htmlClass="card-img"
            />
          </td>
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

import { IProfileGiftAdminDTO } from "@/types/IProfileGiftDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ProfileGiftsApi } from "@/services/admin/ProfileGiftsApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

import AdminIndex from "../../components/shared/base/AdminIndex.vue";
import EventBus from "@/events/EventBus";

import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    IndexControls,
    ImageComponent,
  },
})
export default class ProfileGiftsIndexA extends AdminIndex<
  IProfileGiftAdminDTO
> {
  onDelete(id: string) {
    ProfileGiftsApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfileGiftsApi.index(this.jwt).then(
          (response: IProfileGiftAdminDTO[]) => {
            this.model = response;
          }
        );
      }
    });
  }

  onRestore(id: string) {
    ProfileGiftsApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfileGiftsApi.index(this.jwt).then(
          (response: IProfileGiftAdminDTO[]) => {
            this.model = response;
          }
        );
      }
    });
  }

  created() {
    this.modelName = "ProfileGift";
  }

  mounted() {
    ProfileGiftsApi.index(this.jwt).then((response: IProfileGiftAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
