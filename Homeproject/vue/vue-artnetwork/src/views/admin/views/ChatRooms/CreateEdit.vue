<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="RoomTitle">Title</label>
      <input class="form-control" type="text" id="RoomTitle" maxlength="100" name="RoomTitle" v-model="Model.chatRoomTitle" />
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
