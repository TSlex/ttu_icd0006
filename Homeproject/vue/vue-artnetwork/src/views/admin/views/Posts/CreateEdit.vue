<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="profileId">{{$t('bll.posts.ProfileId')}}*</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="postTitle">{{$t('bll.posts.PostTitle')}}*</label>
      <input class="form-control" type="text" required id="postTitle" name="postTitle" v-model="model.postTitle" />
    </div>

    <div class="form-group">
      <label class="control-label" for="prpostDescriptionice">{{$t('bll.posts.PostDescription')}}</label>
      <input
        class="form-control"
        type="text"
        required
        id="postDescription"
        name="postDescription"
        v-model="model.postDescription"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="postPublicationDateTime">{{$t('bll.posts.PostPublicationDateTime')}}*</label>
      <FlatpickrInput :value="model.postPublicationDateTime" :onChange="(value) => model.postPublicationDateTime = value" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IPostAdminDTO } from "@/types/IPostDTO";

import FlatpickrInput from "@/components/shared/FlatpickrInput.vue";

@Component({
  components: {
    FlatpickrInput,
  },
})
export default class CreateEdit extends Vue {
  @Prop() model!: IPostAdminDTO;
}
</script>

<style>
</style>
