<template>
  <ul class="nav nav-pills flex-column chat_rooms text-center" style="flex-wrap: unset;">
    <li v-for="chatRoom in chatRooms" :key="chatRoom.id" class="nav-item">
      <a class="chat_room btn-link" @click="onSellectChatRoom(chatRoom)">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "@/components/Image.vue";
import store from "@/store";
import { IChatRoomDTO } from "@/types/IChatRoomDTO";
import EventBus from "../../events/EventBus";

@Component({
  components: {
    ImageComponent,
  },
})
export default class ChatRoomsSection extends Vue {
  get chatRooms() {
    return store.state.chatRooms;
  }

  onSellectChatRoom(chatRoom: IChatRoomDTO) {
    store.dispatch("selectChatRoom", chatRoom);
  }
}
</script>

<style>
</style>
