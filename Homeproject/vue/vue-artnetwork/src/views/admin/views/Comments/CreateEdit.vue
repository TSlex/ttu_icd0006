<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="profileId">{{$t('bll.comments.ProfileId')}}</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="postId">{{$t('bll.comments.PostId')}}</label>
      <input class="form-control" type="text" required id="postId" name="postId" v-model="model.postId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="commentValue">{{$t('bll.comments.CommentValue')}}</label>
      <textarea rows="5" class="form-control" id="commentValue" maxlength="300" name="commentValue" v-model="model.commentValue"></textarea>
    </div>

    <div class="form-group">
      <label class="control-label" for="commentDateTime">{{$t('bll.comments.CommentDateTime')}}</label>
      <input
        class="form-control valid"
        type="datetime-local"
        id="commentDateTime"
        name="commentDateTime"
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
