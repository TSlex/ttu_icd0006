<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="ProfileId">Профиль (ID)</label>
      <input class="form-control" type="text" required id="ProfileId" name="ProfileId" v-model="model.profileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="PostId">Пост (ID)</label>
      <input class="form-control" type="text" required id="PostId" name="PostId" v-model="model.postId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="CommentValue">Комментарий</label>
      <textarea rows="5" class="form-control" id="CommentValue" maxlength="300" name="CommentValue" v-model="model.commentValue"></textarea>
    </div>

    <div class="form-group">
      <label class="control-label" for="CommentDateTime">Дата комментария</label>
      <input
        class="form-control valid"
        type="datetime-local"
        id="CommentDateTime"
        name="CommentDateTime"
        v-model="model.commentDateTime"
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
