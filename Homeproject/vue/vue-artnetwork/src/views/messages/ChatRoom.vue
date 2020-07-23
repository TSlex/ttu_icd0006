<template>
  <div v-if="chatRooms" class="chat_section mt-5">
    <MembersDetails v-if="isMembersModal" v-on:onCloseModal="closeMembers" v-on:onChangeRole="changeRole" />
    <RolesDetails v-if="isRolesModal" v-on:onCloseModal="closeRoles" />

    <div class="col-md-4" style="padding: unset">
      <ChatRoomsSection />
    </div>

    <div class="col-md-8" style="padding: unset">
      <MessagesSection v-on:onOpenMembers="openMembers" v-on:onRenameRoom="renameRoom" v-on:onLeaveRoom="leaveRoom" />
    </div>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Component, Prop, Vue } from "vue-property-decorator";

import IdentityStore from "../../components/shared/IdentityStore.vue";
import store from "@/store";

import MembersDetails from "./MembersDetails.vue";
import RolesDetails from "./RolesDetails.vue";
import ChatRoomsSection from "./ChatRoomsSection.vue";
import MessagesSection from "./MessagesSection.vue";

import { IChatMemberDTO } from "@/types/IChatMemberDTO";
import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import { ChatRoomsApi } from "@/services/ChatRoomsApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component({
  components: {
    MembersDetails,
    RolesDetails,
    ChatRoomsSection,
    MessagesSection
  }
})
export default class ChatRoom extends IdentityStore {
  private pageToLoad = 2;
  private isFetching = false;

  @Prop()
  chatRoomId: string | undefined;

  private isMembersModal: boolean = false;
  private isRolesModal: boolean = false;

  get chatRooms() {
    return store.state.chatRooms;
  }

  get currentMember(): IChatMemberDTO | null {
    return store.getters.getCurrentChatMember;
  }

  get selectedChatRoom(): IChatRoomDTO | null {
    return store.state.selectedChatRoom;
  }

  leaveRoom() {
    if (this.currentMember && this.currentMember.canEditMembers) {
      store.dispatch("deleteChatMember", this.currentMember);
    }

    store.dispatch("selectChatRoom", null);
    store.dispatch("getChatRooms");
  }

  renameRoom() {
    if (this.currentMember?.canEditMembers) {
      this.$swal({
        title: this.$t("views.chatrooms.RenameTitle"),
        input: "text",
        inputValue: this.selectedChatRoom!.chatRoomTitle,
        showCancelButton: true,
        confirmButtonText: this.$t("views.common.SaveButton"),
        cancelButtonText: this.$t("views.common.CancelButton"),
        inputValidator: (value: string) => {
          if (!value) {
            return this.$t("views.chatrooms.ErrorTitleEmpty");
          } else {
            ChatRoomsApi.putChatTitle(
              this.selectedChatRoom!.id,
              { id: this.selectedChatRoom!.id, chatRoomTitle: value },
              this.jwt
            ).then((response: ResponseDTO) => {
              if (!response.errors) {
                this.$swal(this.$t("views.chatrooms.TitleWasUpdated")).then(
                  () => {
                    this.$emit("closeGifts");
                  }
                );
              }
            });
          }
        }
      });
    }
  }

  changeRole(member: IChatMemberDTO) {
    store.commit("selectChatMember", member);

    this.isRolesModal = true;
  }

  closeRoles() {
    this.isRolesModal = false;

    store.commit("selectChatMember", null);
  }

  openMembers() {
    this.isMembersModal = true;
  }

  closeMembers() {
    this.isMembersModal = false;
  }

  loadData() {
    store.dispatch("getChatRooms");
    store.dispatch("getChatRoles");
  }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  created(): void {
    this.loadData();
  }
}
</script>
