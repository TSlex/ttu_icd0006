<template>
  <div class="chat_wall" style="position: relative;">
    <template v-if="IsAllLoaded">
      <div class="chat_header d-flex align-items-center">
        <div style="flex-grow: 1; display: flex; justify-content: center">
          <div>&lt;--</div>
          <div
            style="max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
          >{{selectedChatRoom.chatRoomTitle}}</div>
          <div>--&gt;</div>
        </div>

        <div class="profile_controls dropdown dropright show">
          <a
            class="btn fa fa-bars"
            href="#"
            role="button"
            id="profile_more"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></a>

          <div class="dropdown-menu" aria-labelledby="profile_more">
            <div class="text-center d-flex flex-column">
              <a class="btn-link" @click="$emit('onOpenMembers')">{{$t('views.chatrooms.MembersNav')}}</a>
              <a
                v-if="currentMember.canRenameRoom"
                class="btn-link"
                @click="$emit('onRenameRoom')"
              >{{$t('views.chatrooms.RenameNav')}}</a>
              <a class="btn-link" @click="$emit('onLeaveRoom')">{{$t('views.chatrooms.LeaveNav')}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="'message ' + (message.userName === userName ? 'active' : '')"
        >
          <div
            v-if="currentMember.canEditMessages &&
              currentMember.userName == message.userName ||
              currentMember.canEditAllMessages"
            class="message_controls"
          >
            <button class="btn-link fa fa-edit" @click="onEditMessage(message)"></button>
            <button class="btn-link fa fa-times-circle" @click="onDeleteMessage(message)"></button>
          </div>

          <a class="message_profile" asp-controller="Profiles" asp-action="Index" asp-route-username="@item.Profile.UserName">
            <div class="message_avatar">
              <ImageComponent :id="message.profileAvatarId" :key="message.profileAvatarId" height="50px" width="50px" />
            </div>
            <span class="profile_name" style="color: black !important;">{{message.userName}}</span>
          </a>
          <a v-if="checkURL(message.messageValue)" :href="message.messageValue">
            <img :src="message.messageValue" alt="profile" height="auto" width="200px" style="border-radius: 5px" />
          </a>
          <span v-else class="message_value">{{message.messageValue}}</span>
          <span class="message_datetime">{{message.messageDateTime | formatDate}}</span>
        </div>
      </div>
      <template v-if="!messageEditing">
        <form v-if="currentMember && currentMember.canWriteMessages" class="chat_input">
          <textarea rows="2" type="text" id="messageValue" v-model="messagePostModel.messageValue" />
          <button type="submit" class="far fa-paper-plane" @click="onSendMessage"></button>
        </form>
        <span v-else class="text-center p-3 text-danger" style="border-top: solid 1px gray;">{{$t('views.chatrooms.CannotWrite')}}</span>
      </template>
      <form v-else class="chat_input">
        <textarea rows="2" type="text" id="messageValue" v-model="messagePutModel.messageValue" />
        <button type="submit" class="far fa-paper-plane" @click="onPutMessage"></button>
      </form>
    </template>
    <LoadingOverlay v-else :fixed="false" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import IdentityStore from "@/components/shared/IdentityStore.vue";
import store from "@/store";

import ImageComponent from "@/components/Image.vue";

import {
  IMessagePostDTO,
  IMessagePutDTO,
  IMessageDTO,
} from "@/types/IMessageDTO";

import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import { MessagesApi } from "@/services/MessagesApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { IChatMemberDTO } from "@/types/IChatMemberDTO";
import LoadingComponent from "../../components/shared/LoadingComponent.vue";
import EventBus from "../../events/EventBus";

@Component({
  components: {
    ImageComponent,
  },
})
export default class MessagesSection extends IdentityStore {
  private messageEditing: boolean = false;
  private selectedMessage: IMessageDTO | null = null;

  private isMembersLoaded: boolean = false;
  private isMessagesLoaded: boolean = false;

  private messagePostModel: IMessagePostDTO = {
    chatRoomId: "",
    messageValue: "",
  };

  private messagePutModel: IMessagePutDTO = {
    id: "",
    messageValue: "",
  };

  get IsAllLoaded() {
    return this.isMembersLoaded && this.isMessagesLoaded;
  }

  get messages(): IMessageDTO[] {
    return store.state.messages;
  }

  get selectedChatRoom(): IChatRoomDTO | null {
    return store.state.selectedChatRoom;
  }

  get currentMember(): IChatMemberDTO | null {
    return store.getters.getCurrentChatMember;
  }

  onSetMessageEditing(mode: boolean) {
    this.messageEditing = mode;
  }

  onSendMessage(e: Event) {
    if (this.messagePostModel.messageValue !== "") {
      store.dispatch("postMessage", this.messagePostModel).then(() => {
        this.messagePostModel.messageValue = "";
        store.dispatch("getChatRooms");
      });
    }

    e.preventDefault();
  }

  onEditMessage(message: IMessageDTO) {
    this.selectedMessage = message;
    this.messageEditing = true;
    this.messagePutModel.id = message.id;
    this.messagePutModel.messageValue = message.messageValue;
  }

  onPutMessage(e: Event) {
    if (
      this.selectedMessage &&
      this.messagePutModel.id.length > 0 &&
      this.messagePutModel.messageValue.length > 0
    ) {
      this.messageEditing = false;
      this.selectedMessage!.messageValue = this.messagePutModel.messageValue;

      MessagesApi.putMessage(
        this.messagePutModel.id,
        this.messagePutModel,
        this.jwt
      );
    }

    e.preventDefault();
    store.dispatch("getChatRooms");
  }

  onDeleteMessage(message: IMessageDTO) {
    store.dispatch("deleteMessage", message);
  }

  checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  loadComponent() {
    store
      .dispatch("getMessages", {
        chatRoomId: this.selectedChatRoom!.id,
        pageNumber: 1,
      })
      .then(() => {
        this.isMessagesLoaded = true;
      });

    store.dispatch("getChatMembers", this.selectedChatRoom!.id).then(() => {
      this.isMembersLoaded = true;
    });

    this.messagePostModel.chatRoomId = this.selectedChatRoom?.id ?? "";
  }

  created() {
    this.loadComponent();
  }
}
</script>

<style>
</style>
