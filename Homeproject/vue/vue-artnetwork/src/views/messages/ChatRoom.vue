<template>
  <div v-if="chatRooms" class="chat_section mt-5">
    <Modal v-if="isMembersModal" v-on:closeModal="closeMembers">
      <router-link
        class="gallery_item"
        style="width: 150px !important; height: 150px !important"
        :to="'profiles/' + member.userName"
        v-for="(member, index) in members"
        :key="index"
        @click.stop
      >
        <template v-if="member.userName != userName && currentMember != null && currentMember.canEditMembers">
          <button class="item_controls btn-link" style="right: unset; left: 0" @click="deleteMember(member)" @click.prevent>
            <i class="fas fa-times-circle"></i>
          </button>

          <button class="item_controls btn-link" style="right: 0; left: unset" @click="changeRole(member)" @click.prevent>
            <i class="fas fa-edit"></i>
          </button>
        </template>

        <ImageComponent :id="member.profileAvatarId" :key="member.profileAvatarId" height="150px" width="150px" />
        <span class="item_name" style="bottom: 15px">{{member.chatRoleValue}}</span>
        <span class="item_name">{{member.userName}}</span>
      </router-link>
    </Modal>

    <Modal v-if="isRolesModal && selectedMemberRole" v-on:closeModal="closeRoles">
      <div class="col-md-5 text-center" style="padding: 50px;">
        <div class="form-group d-flex flex-column">
          <label class="control-label" for="ChatMember_ChatRoleId">Chat role</label>
          <select class="form-control valid" v-model="selectedMemberRole">
            <option
              v-for="(chatRole, index) in chatRoles"
              :key="index"
              :value="chatRole"
              @click="sellectRole(chatRole)"
            >{{chatRole.roleTitleValue}}</option>
          </select>
        </div>

        <div class="form-group">
          <button class="btn btn-success mr-1" @click="commitRole">Submit</button>
          <button class="btn btn-secondary" @click="closeRoles">Cancel</button>
        </div>
      </div>
    </Modal>

    <div class="col-md-4" style="padding: unset">
      <ul class="nav nav-pills flex-column chat_rooms text-center">
        <li v-for="chatRoom in chatRooms" :key="chatRoom.id" class="nav-item">
          <a class="chat_room btn-link" @click="selectChatRoom(chatRoom)">
            <div v-if="chatRoom.lastMessageValue" :key="chatRoom.lastMessageValue" class="message">
              <div class="message_profile" style="width: 240px;">
                <div class="message_avatar">
                  <ImageComponent :id="chatRoom.chatRoomImageId" :key="chatRoom.chatRoomImageId" height="50px" width="50px" />
                </div>
                <div
                  class="profile_name"
                  style="color: black !important; margin: auto; max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                >{{chatRoom.chatRoomTitle}}</div>
              </div>
              <div
                class="message_value"
                style="max-height: 50px; overflow: hidden; text-overflow: ellipsis;"
              >{{chatRoom.lastMessageValue}}</div>
              <span class="message_datetime">{{chatRoom.lastMessageDateTime | formatDate}}</span>
            </div>
            <div
              v-else
              class="mb-3"
              style="color: black !important; margin: auto; max-width: 400px;
                                    overflow: hidden; text-overflow: ellipsis;
                                background: white; border: 1px solid gray; border-radius: 5px; padding: 10px"
            >{{chatRoom.chatRoomTitle}}</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-md-8" style="padding: unset">
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
                  <a class="btn-link" @click="openMembers">Members</a>
                  <a class="btn-link" @click="renameRoom">Change Title</a>
                  <a class="btn-link" @click="leaveRoom">Leave</a>
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
                <button class="btn-link fa fa-edit" @click="editMessage(message)"></button>
                <button class="btn-link fa fa-times-circle" @click="deleteMessage(message)"></button>
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
              <textarea rows="2" type="text" id="messageValue" v-model="messageModel.messageValue" />
              <button type="submit" class="far fa-paper-plane" @click="sendMessage"></button>
            </form>
            <span
              v-else
              class="text-center p-3 text-danger"
              style="border-top: solid 1px gray;"
            >You cannot send messages to this chat!</span>
          </template>
          <form v-else class="chat_input">
            <textarea rows="2" type="text" id="messageValue" v-model="messagePutModel.messageValue" />
            <button type="submit" class="far fa-paper-plane" @click="putMessage"></button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import Modal from "../../components/Modal.vue";
import store from "@/store";
import {
  IMessagePostDTO,
  IMessageDTO,
  IMessagePutDTO
} from "../../types/IMessageDTO";
import { IChatMemberDTO } from "@/types/IChatMemberDTO";
import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import Axios, { AxiosResponse } from "axios";
import { ResponseDTO } from "@/types/Response/ResponseDTO";
import { swal } from "vue/types/umd";
import { IChatRoleDTO } from "../../types/IChatRoleDTO";
import { ChatMembersApi } from "../../services/ChatMembersApi";
import { ChatRolesApi } from "../../services/ChatRolesApi";
import { ChatRoomsApi } from "../../services/ChatRoomsApi";
import { MessagesApi } from "../../services/MessagesApi";

@Component({
  components: {
    ImageComponent,
    Modal
  }
})
export default class ChatRoom extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  private messageModel: IMessagePostDTO = {
    chatRoomId: "",
    messageValue: ""
  };

  private messagePutModel: IMessagePutDTO = {
    id: "",
    messageValue: ""
  };

  @Prop()
  chatRoomId: string | undefined;

  private isMembersModal: boolean = false;
  private isRolesModal: boolean = false;
  private messageEditing: boolean = false;

  private selectedChatRoom: IChatRoomDTO | null = null;
  private selectedMemberRole: IChatRoleDTO | null = null;
  private selectedChatMember: IChatMemberDTO | null = null;
  private selectedMessage: IMessageDTO | null = null;

  get chatRoles() {
    return store.state.chatRoles;
  }

  get jwt() {
    return store.getters.getJwt;
  }

  get chatRooms() {
    return store.state.chatRooms;
  }

  get messages() {
    return store.state.messages;
  }

  get currentMember(): IChatMemberDTO | null {
    let current: IChatMemberDTO | null = null;

    this.members.forEach((member: IChatMemberDTO) => {
      if (member.userName === this.userName) {
        current = member;
      }
    });

    return current;
  }

  get members() {
    return store.state.members;
  }

  get userName() {
    return store.getters.getUserName;
  }

  setMessageEditing(mode: boolean) {
    this.messageEditing = mode;
  }

  editMessage(message: IMessageDTO) {
    this.selectedMessage = message;
    this.messageEditing = true;
    this.messagePutModel.id = message.id;
    this.messagePutModel.messageValue = message.messageValue;
  }

  putMessage(e: Event) {
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
        this.setMessageEditing(false);
      });
    }

    e.preventDefault();
    store.dispatch("getChatRooms");
  }

  deleteMessage(message: IMessageDTO) {
    store.dispatch("deleteMessage", message);
  }

  leaveRoom() {
    if (this.currentMember && this.currentMember.canEditMembers) {
      store.dispatch("deleteChatMember", this.currentMember);
    }

    this.selectedChatRoom = null;
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
    this.isRolesModal = true;
    this.selectedChatMember = member;

    this.chatRoles.forEach((chatRole: IChatRoleDTO) => {
      if (member.chatRole === chatRole.roleTitle) {
        this.selectedMemberRole = chatRole;
      }
    });
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
    this.isRolesModal = false;
    this.selectedChatMember = null;
    this.selectedMemberRole = null;
  }

  openMembers() {
    this.isMembersModal = true;
  }

  closeMembers() {
    this.isMembersModal = false;
  }

  deleteMember(member: IChatMemberDTO) {
    if (this.currentMember && this.currentMember.canEditMembers) {
      store.dispatch("deleteChatMember", member);
      store.dispatch("getChatRooms");
    }
  }

  checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  sendMessage(e: Event) {
    if (this.messageModel.messageValue !== "") {
      store.dispatch("sendMessage", this.messageModel).then(() => {
        this.messageModel.messageValue = "";
        store.dispatch("getChatRooms");
      });
    }

    e.preventDefault();
  }

  selectChatRoom(chatRoom: IChatRoomDTO) {
    store.dispatch("getMessages", {
      chatRoomId: chatRoom.id,
      pageNumber: 1
    });

    this.selectedChatRoom = chatRoom;
    this.messageModel.chatRoomId = chatRoom.id;

    store.dispatch("getChatMembers", chatRoom.id);
  }

  loadData() {
    store.dispatch("getChatRooms");
    store.dispatch("getChatRoles");
  }

  scroll() {
    window.onscroll = (e: Event) => {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight >
        document.documentElement.offsetHeight - 1400;

      let toUpButton = document.getElementById("toUpButton")!;

      if (document.documentElement.scrollTop > 100) {
        toUpButton.style.display = "initial";
      } else {
        toUpButton.style.display = "none";
      }

      if (bottomOfWindow && this.canLoadMore && !this.isFetching) {
        this.isFetching = true;
        store.dispatch("getFeed", this.pageToLoad);
        this.pageToLoad += 1;
      }
    };
  }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  beforeCreate(): void {
    console.log("beforeCreate");
  }

  created(): void {
    console.log("created");
    this.loadData();
  }

  beforeMount(): void {
    console.log("beforeMount");
  }

  mounted(): void {
    console.log("mounted");
  }

  beforeUpdate(): void {
    console.log("beforeUpdate");
  }

  updated(): void {
    console.log("updated");
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
