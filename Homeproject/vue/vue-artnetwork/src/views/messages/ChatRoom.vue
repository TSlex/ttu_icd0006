<template>
  <div>
    <div v-if="IsAllLoaded" class="chat_section mt-5">
      <MembersDetails v-if="isMembersModal" v-on:modal-close="closeMembers" v-on:model-changeRole="changeRole" />
      <RolesDetails v-if="isRolesModal" v-on:modal-close="closeRoles" />

      <div class="col-md-4" style="padding: unset; overflow: hidden;">
        <ChatRoomsSection />
      </div>

      <div class="col-md-8" style="padding: unset;">
        <MessagesSection
          :key="selectedChatRoom.id"
          v-if="selectedChatRoom"
          v-on:members-open="openMembers"
          v-on:chatroom-rename="renameRoom"
          v-on:chatroom-leave="leaveRoom"
        />
        <div v-else class="chat_wall" style="position: relative;"></div>
      </div>
    </div>
    <LoadingOverlay v-else />
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
import LoadingComponent from "../../components/shared/LoadingComponent.vue";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    MembersDetails,
    RolesDetails,
    ChatRoomsSection,
    MessagesSection,
  },
})
export default class ChatRoom extends IdentityStore {
  @Prop() chatRoomId: string | undefined;

  private pageToLoad = 2;
  private isFetching = false;

  private isMembersModal: boolean = false;
  private isRolesModal: boolean = false;

  private isChatRoomsLoaded: boolean = false;
  private isChatRolesLoaded: boolean = false;

  private loadedCulture!: string;

  get IsAllLoaded() {
    return this.isChatRoomsLoaded && this.isChatRolesLoaded;
  }

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
      store.dispatch("leaveRoom", {
        room: { ...this.selectedChatRoom },
        member: { ...this.currentMember },
      });
    }
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
            store
              .dispatch("renameChatRoom", {
                ...this.selectedChatRoom,
                ...{ chatRoomTitle: value },
              })
              .then((response: ResponseDTO) => {
                if (!response.errors) {
                  this.$swal(this.$t("views.chatrooms.TitleWasUpdated"));
                }
              });
          }
        },
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

  updateRoles() {
    this.isChatRolesLoaded = false;

    store.dispatch("getChatRoles").then(() => {
      this.isChatRolesLoaded = true;
    });
  }

  loadData() {
    store.dispatch("getChatRooms").then(() => {
      this.isChatRoomsLoaded = true;

      if (this.chatRoomId) {
        store.dispatch(
          "selectChatRoom",
          store.getters.getChatRoomById(this.chatRoomId)
        );
      }
    });
    store.dispatch("getChatRoles").then(() => {
      this.isChatRolesLoaded = true;
    });
  }

  created(): void {
    this.loadedCulture = store.state.culture!;

    EventBus.$on("culture-update", (culture: string) => {
      if (this.loadedCulture !== culture) {
        this.loadedCulture = culture;
        this.updateRoles();
      }
    });

    this.loadData();
  }
}
</script>
