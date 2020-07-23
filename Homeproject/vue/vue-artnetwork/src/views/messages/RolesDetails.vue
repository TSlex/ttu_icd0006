<template>
  <Modal v-on:closeModal="closeRoles">
    <div class="col-md-5 text-center" style="padding: 50px;">
      <div class="form-group d-flex flex-column">
        <label class="control-label" for="ChatMember_ChatRoleId">{{$t("bll.chatroles.RoleTitle")}}</label>
        <select class="form-control valid" v-model="rolePutModel">
          <option v-for="(chatRole, index) in chatRoles" :key="index" :value="chatRole">{{chatRole.roleTitleValue}}</option>
        </select>
      </div>

      <div class="form-group">
        <button class="btn btn-success mr-1" @click="commitRole">{{$t("views.common.SaveButton")}}</button>
        <button class="btn btn-secondary" @click="closeRoles">{{$t("views.common.CancelButton")}}</button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IChatMemberDTO } from "@/types/IChatMemberDTO";
import store from "@/store";
import { IChatRoleDTO } from "@/types/IChatRoleDTO";
import { ChatMembersApi } from "@/services/ChatMembersApi";
import IdentityStore from "../../components/shared/IdentityStore.vue";
import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class RolesDetails extends IdentityStore {
  private rolePutModel?: IChatRoleDTO;

  get selectedMemberRole(): IChatRoleDTO | null {
    return store.state.selectedMemberRole;
  }

  get chatRoles() {
    return store.state.chatRoles;
  }

  get selectedChatMember(): IChatMemberDTO | null {
    return store.state.selectedChatMember;
  }

  get selectedChatRoom(): IChatRoomDTO | null {
    return store.state.selectedChatRoom;
  }

  get currentMember(): IChatMemberDTO | null {
    return store.getters.getCurrentChatMember;
  }

  commitRole() {
    if (
      this.currentMember?.canEditMembers &&
      !this.rolePutModel?.canEditMembers &&
      this.rolePutModel
    ) {
      ChatMembersApi.setMemberRole(
        this.selectedChatMember!.id,
        this.rolePutModel.roleTitle,
        this.jwt
      ).then(() => store.dispatch("getChatMembers", this.selectedChatRoom!.id));
    }

    this.closeRoles();
  }

  closeRoles() {
    this.$emit("onCloseModal");
  }

  created() {
    this.rolePutModel = this.selectedMemberRole ?? ({} as IChatRoleDTO);
  }
}
</script>

<style>
</style>
