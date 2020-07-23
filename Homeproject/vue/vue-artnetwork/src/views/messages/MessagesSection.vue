<template>
  <div class="chat_wall">
    <template v-if="selectedChatRoom">
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
              <a class="btn-link" @click="$emit('onOpenMembers')">Members</a>
              <a class="btn-link" @click="$emit('onRenameRoom')">Change Title</a>
              <a class="btn-link" @click="$emit('onLeaveRoom')">Leave</a>
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
        <span
          v-else
          class="text-center p-3 text-danger"
          style="border-top: solid 1px gray;"
        >You cannot send messages to this chat!</span>
      </template>
      <form v-else class="chat_input">
        <textarea rows="2" type="text" id="messageValue" v-model="messagePutModel.messageValue" />
        <button type="submit" class="far fa-paper-plane" @click="onPutMessage"></button>
      </form>
    </template>
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
  IMessageDTO
} from "@/types/IMessageDTO";

import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import { MessagesApi } from "@/services/MessagesApi";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { IChatMemberDTO } from "@/types/IChatMemberDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class MessagesSection extends IdentityStore {
  private messageEditing: boolean = false;
  private selectedMessage: IMessageDTO | null = null;

  private messagePostModel: IMessagePostDTO = {
    chatRoomId: "",
    messageValue: ""
  };

  private messagePutModel: IMessagePutDTO = {
    id: "",
    messageValue: ""
  };

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
      store.dispatch("sendMessage", this.messagePostModel).then(() => {
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
      MessagesApi.putMessage(
        this.messagePutModel.id,
        this.messagePutModel,
        this.jwt
      ).then((response: ResponseDTO) => {
        if (!response.errors) {
          this.selectedMessage!.messageValue = this.messagePutModel.messageValue;
        }
        this.onSetMessageEditing(false);
      });
    }

    e.preventDefault();
    store.dispatch("getChatRooms");
  }

  onDeleteMessage(message: IMessageDTO) {
    store.dispatch("deleteMessage", message);
  }

  updated() {
    this.messagePostModel.chatRoomId = this.selectedChatRoom?.id ?? "";
  }

  checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
}
</script>

<style>
</style>