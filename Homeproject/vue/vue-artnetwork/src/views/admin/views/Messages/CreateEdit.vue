<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="profileId">{{$t('bll.messages.ProfileId')}}</label>
      <input class="form-control" type="text" id="profileId" name="profileId" v-model="model.profileId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="chatRoomId">{{$t('bll.messages.ChatRoomId')}}</label>
      <input class="form-control" type="text" id="chatRoomId" name="chatRoomId" v-model="model.chatRoomId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="messageValue">{{$t('bll.messages.MessageValue')}}</label>
      <input class="form-control" type="text" id="messageValue" maxlength="3000" name="messageValue" v-model="model.messageValue" />
    </div>
    <div class="form-group">
      <label class="control-label" for="messageDateTime">{{$t('bll.messages.MessageDateTime')}}</label>
      <input
        class="form-control"
        type="datetime-local"
        id="messageDateTime"
        name="messageDateTime"
        v-model="model.messageDateTime"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IMessageAdminDTO } from "@/types/IMessageDTO";

@Component({
  components: {},
})
export default class CreateEdit extends Vue {
  @Prop() model!: IMessageAdminDTO;
}
</script>

<style>
</style>
