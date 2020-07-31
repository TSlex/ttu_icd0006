<template>
  <div>
    <AdminIndexWrapper :canCreate="false">
      <table class="table">
        <thead>
          <tr>
            <th>{{$t('bll.common.Id')}}</th>
            <th>{{$t('bll.profiles.UserName')}}</th>
            <th>{{$t('bll.profiles.Email')}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in model" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.userName}}</td>
            <td>{{item.email}}</td>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import { IProfileAdminDTO } from "@/types/IProfileDTO";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

import { ProfilesApi } from "@/services/admin/ProfilesApi";

import IndexControls from "@/views/admin/components/shared/IndexControls.vue";
import AdminIndex from "../../components/shared/base/AdminIndex.vue";

@Component({
  components: {
    IndexControls,
  },
})
export default class ProfilesIndexA extends AdminIndex<IProfileAdminDTO> {
  onDelete(id: string) {
    ProfilesApi.delete(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfilesApi.index(this.jwt).then((response: IProfileAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  onRestore(id: string) {
    ProfilesApi.restore(id, this.jwt).then((response: ResponseDTO) => {
      if (!response?.errors) {
        ProfilesApi.index(this.jwt).then((response: IProfileAdminDTO[]) => {
          this.model = response;
        });
      }
    });
  }

  beforeCreate() {
    this.modelName = "Profile";
  }

  mounted() {
    ProfilesApi.index(this.jwt).then((response: IProfileAdminDTO[]) => {
      this.model = response;
    });
  }
}
</script>
