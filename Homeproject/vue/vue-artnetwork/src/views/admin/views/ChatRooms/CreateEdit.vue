<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="chatRoomTitle">{{$t("bll.chatrooms.ChatRoomTitle")}}</label>
      <input
        class="form-control"
        type="text"
        id="chatRoomTitle"
        maxlength="100"
        name="chatRoomTitle"
        v-model="model.chatRoomTitle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IRankAdminDTO } from "@/types/IRankDTO";

@Component({
  components: {},
})
export default class CreateEdit extends Vue {
  @Prop() model!: IRankAdminDTO;
}
</script>

<style>
</style>
