<template>
  <div class="chat_section mt-5">
    <div class="row">
      <div class="col-md-4">
        <ul class="nav nav-pills flex-column chat_rooms">
          <li v-for="chatRoom in chatRooms" :key="chatRoom.id" class="nav-item">
            <a class="nav-link text-primary" @click="selectChatRoom(chatRoom.id)">{{chatRoom.chatRoomTitle}}</a>
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <div class="chat_wall">
          <div class="messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="'message ' + (message.userName === userName ? 'active' : '')"
            >
              <span class="message_username">{{message.userName}}</span>
              <span class="message_value">{{message.messageValue}}</span>
              <span class="message_time">{{message.messageDateTime | formatTime}}</span>
            </div>
          </div>
          <form class="chat_input">
            <textarea rows="2" type="text" id="messageValue" v-model="messageModel.messageValue" />
            <button type="submit" class="far fa-paper-plane" @click="sendMessage"></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from "jquery";
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import store from "@/store";
import { IMessagePostDTO } from "../../types/IMessageDTO";

@Component({
  components: {
    ImageComponent
  }
})
export default class ChatRoom extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  private messageModel: IMessagePostDTO = {
    chatRoomId: "",
    messageValue: ""
  };

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

  sendMessage(e: Event) {
    if (this.messageModel.messageValue === "") {
      return;
    }

    store.dispatch("sendMessage", this.messageModel).then(() => {
      this.messageModel.messageValue = "";
    });

    e.preventDefault();
  }

  selectChatRoom(chatRoomId: string) {
    store.dispatch("getMessages", {
      chatRoomId: chatRoomId,
      pageNumber: 1
    });

    this.messageModel.chatRoomId = chatRoomId;

    store.dispatch("getChatMembers", chatRoomId);
  }

  loadData() {
    store.dispatch("getChatRooms").then(() => {
      if (this.chatRooms.length > 0) {
        store.dispatch("getMessages", {
          chatRoomId: this.chatRooms[0].id,
          pageNumber: 1
        });

        this.messageModel.chatRoomId = this.chatRooms[0].id;

        store.dispatch("getChatMembers", this.chatRooms[0].id);
      }
    });
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
        // console.log(this.pageToLoad);
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
    // this.scroll();
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
