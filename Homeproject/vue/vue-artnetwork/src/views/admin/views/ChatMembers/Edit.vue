<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="ProfileId">Profile (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="ProfileId" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="CMrofileId">Room (ID)</label>
      <input class="form-control" type="text" required id="CMrofileId" name="CMrofileId" v-model="model.chatRoomId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="CMrofileId" data-valmsg-replace="true"></span>
    </div>
    <div class="form-group">
      <label class="control-label" for="CMrofileId">Role (ID)</label>
      <input class="form-control" type="text" required id="CMrofileId" name="CMrofileId" v-model="model.chatRoleId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="CMrofileId" data-valmsg-replace="true"></span>
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";

import { IChatMemberAdminDTO } from "@/types/IChatMemberDTO";

import { ChatMembersApi } from "@/services/admin/ChatMembersApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

@Component
export default class CMEditA extends AdminEdit<IChatMemberAdminDTO> {
  mounted() {
    ChatMembersApi.details(this.Id, this.jwt).then(
      (response: IChatMemberAdminDTO) => {
        this.model = response;
      }
    );
  }

  onSubmit() {
    if (this.Id && this.model) {
      ChatMembersApi.edit(this.Id, this.model, this.jwt).then(
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
