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
          <th>URL</th>
          <th>Resolution</th>
          <th>Padding</th>
          <th>IS DELETED?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Model" :key="item.id">
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IImageAdminDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ImagesApi } from "@/services/admin/ImagesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class ImagesIndexA extends Vue {
  private Model: IImageAdminDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  onCreate() {
    router.push({ name: "ImagesCreateA" });
  }

  onHistory(id: string) {
    ImagesApi.history(id, this.jwt).then((response: IImageAdminDTO[]) => {
      this.Model = response;
    });
  }

  onEdit(id: string) {
    router.push({ name: "ImagesEditA", params: { id } });
  }

  onDetails(id: string) {
    router.push({ name: "ImagesDetailsA", params: { id } });
  }

  onDelete(id: string) {
    ImagesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ImagesApi.index(this.jwt).then((response: IImageAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ImagesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ImagesApi.index(this.jwt).then((response: IImageAdminDTO[]) => {
          this.Model = response;
        });
      }
    });
  }

  mounted() {
    ImagesApi.index(this.jwt).then((response: IImageAdminDTO[]) => {
      this.Model = response;
    });
  }
}
</script>
