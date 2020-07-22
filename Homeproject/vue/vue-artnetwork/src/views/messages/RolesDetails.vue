<template>
  <Modal v-on:closeModal="closeRoles">
    <div class="col-md-5 text-center" style="padding: 50px;">
      <div class="form-group d-flex flex-column">
        <label class="control-label" for="ChatMember_ChatRoleId">Chat role</label>
        <select class="form-control valid" v-model="selectedMemberRole">
          <option v-for="(chatRole, index) in chatRoles" :key="index" :value="chatRole">{{chatRole.roleTitleValue}}</option>
        </select>
      </div>

      <div class="form-group">
        <button class="btn btn-success mr-1" @click="commitRole">Submit</button>
        <button class="btn btn-secondary" @click="closeRoles">Cancel</button>
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

@Component({
  components: {}
})
export default class CommentsSection extends IdentityStore {
  private selectedMemberRole: IChatRoleDTO | null = null;

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
      !this.selectedMemberRole?.canEditMembers &&
      this.selectedMemberRole
    ) {
      ChatMembersApi.setMemberRole(
        this.selectedChatMember!.id,
        this.selectedMemberRole.roleTitle,
        this.jwt
      ).then(() => store.dispatch("getChatMembers", this.selectedChatRoom!.id));
    }

    this.closeRoles();
  }

  closeRoles() {
    this.$emit("onCloseModal");
  }
}
</script>

<style>
</style>
