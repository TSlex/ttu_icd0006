<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="ProfileId">Профиль (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="ChatRoomId">Комната (ID)</label>
      <input class="form-control" type="text" required id="ChatRoomId" name="ChatRoomId" v-model="model.chatRoomId" />
    </div>
    <div class="form-group">
      <label class="control-label" for="MessageValue">Сообщение</label>
      <input class="form-control" type="text" id="MessageValue" maxlength="3000" name="MessageValue" v-model="model.messageValue" />
    </div>
    <div class="form-group">
      <label class="control-label" for="MessageDateTime">Дата сообщения</label>
      <input
        class="form-control"
        type="datetime-local"
        id="MessageDateTime"
        name="MessageDateTime"
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
