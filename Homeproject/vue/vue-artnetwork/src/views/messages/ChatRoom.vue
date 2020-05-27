<template>
  <div class="chat_section mt-5">
    <Modal v-if="isMembersModal" v-on:closeModal="closeMembers">
      <router-link class="gallery_item" :to="member.userName" v-for="(member, index) in members" :key="index">
        <form asp-action="Delete">
          <button type="submit" class="item_controls btn-link">
            <i class="fas fa-times-circle"></i>
          </button>
          <input type="hidden" asp-for="@follower.Id" name="Id" />
        </form>

        <ImageComponent :id="member.profileAvatarId" :key="member.profileAvatarId" height="100px" width="100px" />
        <span class="item_name">{{member.userName}}</span>
      </router-link>
    </Modal>

    <div class="col-md-4" style="padding: unset">
      <ul class="nav nav-pills flex-column chat_rooms text-center">
        <li v-for="chatRoom in chatRooms" :key="chatRoom.id" class="nav-item">
          <a class="chat_room btn-link" @click="selectChatRoom(chatRoom)">
            <div v-if="chatRoom.lastMessageValue" class="message">
              <div class="message_profile" style="width: 240px;">
                <div class="message_avatar">
                  <ImageComponent
                    :id="chatRoom.lastMessageProfileAvatarId"
                    :key="chatRoom.lastMessageProfileAvatarI"
                    height="50px"
                    width="50px"
                  />
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
              style="color: black !important; margin: auto; max-width: 400px;
                                    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
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
                  <a class="btn-link">Change Title</a>
                  <a class="btn-link">Leave</a>
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
              <div class="message_controls">
                <a class="fa fa-edit" asp-action="Edit" asp-controller="Messages" asp-route-id="@item.Id"></a>

                <form asp-action="Delete" asp-controller="Messages" method="post" class="disable_form_style">
                  <input type="hidden" name="id" asp-for="@item.Id" />
                  <button class="btn-link fa fa-times-circle" style="margin: 0 !important;"></button>
                </form>
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
          <form class="chat_input">
            <textarea rows="2" type="text" id="messageValue" v-model="messageModel.messageValue" />
            <button type="submit" class="far fa-paper-plane" @click="sendMessage"></button>
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
import { IMessagePostDTO } from "../../types/IMessageDTO";
import { IChatMemberDTO } from "@/types/IChatMemberDTO";
import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import Axios, { AxiosResponse } from "axios";

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

  @Prop()
  chatRoomId: string | undefined;

  // private members: IChatMemberDTO[] | null = null;

  private isMembersModal: boolean = false;

  private selectedChatRoom: IChatRoomDTO | null = null;

  openMembers() {
    this.isMembersModal = true;
  }

  closeMembers() {
    this.isMembersModal = false;
  }

  get chatRooms() {
    return store.state.chatRooms;
  }

  get messages() {
    return store.state.messages;
  }

  get members() {
    return store.state.members;
  }

  get userName() {
    return store.getters.getUserName;
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
