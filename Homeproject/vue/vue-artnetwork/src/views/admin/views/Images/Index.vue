<template>
  <AdminIndexWrapper v-if="isLoaded" :canCreate="true" v-on:onCreate="onCreate">
    <table class="table">
      <thead>
        <tr>
          <th>(ID)</th>
          <th>URL</th>
          <th>Resolution</th>
          <th>Padding</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in model" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.imageUrl}}</td>
          <td>{{item.widthPx}}x{{item.heightPx}}</td>
          <td>{{item.paddingTop}};{{item.paddingRight}};{{item.paddingBottom}};{{item.paddingLeft}}</td>
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
  </AdminIndexWrapper>
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

@Component({
  components: {
    IndexControls,
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
    });
  }
}
</script>
