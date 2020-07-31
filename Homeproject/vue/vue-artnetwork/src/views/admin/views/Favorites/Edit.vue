<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="ProfileId">Профиль (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="PostId">Пост (ID)</label>
      <input class="form-control" type="text" required id="PostId" name="PostId" v-model="model.postId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="PostId" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="PostTitle">Название поста</label>
      <input class="form-control" type="text" id="PostTitle" name="PostTitle" value="1" v-model="model.postTitle" />
      <span class="text-danger field-validation-valid" data-valmsg-for="PostTitle" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="PostDescription">Описание поста</label>
      <input class="form-control" type="text" id="PostDescription" name="PostDescription" v-model="model.postDescription" />
      <span class="text-danger field-validation-valid" data-valmsg-for="PostDescription" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="PostImageId">Картинка (ID)</label>
      <input class="form-control" type="text" id="PostImageId" name="PostImageId" v-model="model.postImageId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="PostImageId" data-valmsg-replace="true"></span>
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IFavoriteAdminDTO } from "@/types/IFavoriteDTO";

import { FavoritesApi } from "@/services/admin/FavoritesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component
export default class FavoritesEditA extends AdminEdit<IFavoriteAdminDTO> {
  mounted() {
    FavoritesApi.details(this.Id, this.jwt).then(
      (response: IFavoriteAdminDTO) => {
        this.model = response;
      }
    );
  }

  submit() {
    if (this.Id && this.model) {
      FavoritesApi.edit(this.Id, this.model, this.jwt).then(
        (response: ResponseDTO) => {
          if (response?.errors) {
            this.errors = response.errors;
          } else {
            this.$router.go(-1);
          }
        }
      );
    }
  }
}
</script>
