<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="profileId">Profile (ID)</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>

    <div class="form-group">
      <label class="control-label" for="postTitle">Title</label>
      <input class="form-control" type="text" required id="postTitle" name="postTitle" v-model="model.postTitle" />
    </div>

    <div class="form-group">
      <label class="control-label" for="prpostDescriptionice">Description</label>
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
      <label class="control-label" for="postPublicationDateTime">DateTime</label>
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
