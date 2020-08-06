<template>
  <Modal v-on:modal-close="$emit('onCloseModal')">
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

        <button class="item_controls btn-link" style="right: 0; left: unset" @click="$emit('role-change', member)" @click.prevent>
          <i class="fas fa-edit"></i>
        </button>
      </template>

      <ImageComponent :id="member.profileAvatarId" :key="member.profileAvatarId" height="150px" width="150px" />
      <span class="item_name" style="bottom: 15px">{{member.chatRoleValue}}</span>
      <span class="item_name">{{member.userName}}</span>
    </router-link>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import IdentityStore from "../../components/shared/IdentityStore.vue";
import store from "@/store";

import ImageComponent from "@/components/Image.vue";
import Modal from "@/components/Modal.vue";

import { IChatMemberDTO } from "@/types/IChatMemberDTO";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    ImageComponent,
    Modal,
  },
})
export default class MembersDetails extends IdentityStore {
  private loadedCulture!: string;

  get currentMember(): IChatMemberDTO | null {
    return store.getters.getCurrentChatMember;
  }

  get members() {
    return store.state.members;
  }

  deleteMember(member: IChatMemberDTO) {
    if (this.currentMember && this.currentMember.canEditMembers) {
      store.dispatch("deleteChatMember", member);
      store.dispatch("getChatRooms");
    }
  }

  created() {
    this.loadedCulture = store.state.culture!;

    EventBus.$on("culture-update", (culture: string) => {
      if (this.loadedCulture !== culture) {
        this.$emit("onCloseModal");
      }
    });
  }
}
</script>

<style>
</style>
