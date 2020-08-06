<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:view-create="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>{{$t('bll.common.Id')}}</th>
          <th>{{$t('bll.images.ImageUrl')}}</th>
          <th>{{$t('views.images.Preview')}}</th>
          <th>{{$t('views.images.Resolution')}}</th>
          <th>{{$t('views.images.Paddings')}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.imageUrl}}</td>
          <td>
            <ImageComponent :id="item.id" htmlParentStyle="width: 5rem" height="unset" width="unset" htmlClass="card-img" />
          </td>
          <td>{{item.widthPx}}x{{item.heightPx}}</td>
          <td>{{item.paddingTop}};{{item.paddingRight}};{{item.paddingBottom}};{{item.paddingLeft}}</td>
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

import { IImageAdminDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ImagesApi } from "@/services/admin/ImagesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

import ImageComponent from "@/components/Image.vue";

@Component({
  components: {
    IndexControls,
    ImageComponent,
  },
})
export default class ImagesIndexA extends AdminIndex<IImageAdminDTO> {
  onHistory(id: string) {
    ImagesApi.history(id, this.jwt).then((response: IImageAdminDTO[]) => {
      this.model = response;
    });
  }

  onDelete(id: string) {
    ImagesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ImagesApi.index(this.jwt).then((response: IImageAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ImagesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ImagesApi.index(this.jwt).then((response: IImageAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  created() {
    this.modelName = "Image";
  }

  mounted() {
    ImagesApi.index(this.jwt).then((response: IImageAdminDTO[]) => {
      this.model = response;
      this.isLoaded = true;
    });
  }
}
</script>
