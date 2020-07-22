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
        title: "Enter a new room title",
        input: "text",
        inputValue: this.selectedChatRoom!.chatRoomTitle,
        showCancelButton: true,
        inputValidator: (value: string) => {
          if (!value) {
            return "Room title cannot be empty!";
          } else {
            ChatRoomsApi.putChatTitle(
              this.selectedChatRoom!.id,
              { id: this.selectedChatRoom!.id, chatRoomTitle: value },
              this.jwt
            ).then((response: ResponseDTO) => {
              if (!response.errors) {
                this.$swal("Room title was changed").then(() => {
                  this.$emit("closeGifts");
                });
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

  // scroll() {
  //   window.onscroll = (e: Event) => {
  //     let bottomOfWindow =
  //       Math.max(
  //         window.pageYOffset,
  //         document.documentElement.scrollTop,
  //         document.body.scrollTop
  //       ) +
  //         window.innerHeight >
  //       document.documentElement.offsetHeight - 1400;

  //     let toUpButton = document.getElementById("toUpButton")!;

  //     if (document.documentElement.scrollTop > 100) {
  //       toUpButton.style.display = "initial";
  //     } else {
  //       toUpButton.style.display = "none";
  //     }

  //     if (bottomOfWindow && this.canLoadMore && !this.isFetching) {
  //       this.isFetching = true;
  //       store.dispatch("getFeed", this.pageToLoad);
  //       this.pageToLoad += 1;
  //     }
  //   };
  // }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  created(): void {
    this.loadData();
  }
}
</script>
