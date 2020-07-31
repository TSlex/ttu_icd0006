<template>
  <AdminEditWrapper v-if="isLoaded" v-on:onSubmit="onSubmit" v-on:onBackToList="onBackToList" :errors="errors">
    <div class="form-group">
      <label class="control-label" for="profileId">{{$t('bll.chatmembers.ProfileId')}}</label>
      <input class="form-control" type="text" id="profileId" name="profileId" v-model="model.profileId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="chatRoomId">{{$t('bll.chatmembers.ChatRoomId')}}</label>
      <input class="form-control" type="text" id="chatRoomId" name="chatRoomId" v-model="model.chatRoomId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="chatRoleId">{{$t('bll.chatmembers.ChatRoleId')}}</label>
      <input class="form-control" type="text" id="chatRoleId" name="chatRoleId" v-model="model.chatRoleId" />
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

  created() {
    this.modelName = "ChatMember";
  }

  mounted() {
    ChatMembersApi.details(this.Id, this.jwt).then(
      (response: IChatMemberAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }
}
</script>
