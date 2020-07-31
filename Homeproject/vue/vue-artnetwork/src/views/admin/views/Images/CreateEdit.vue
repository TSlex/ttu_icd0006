<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="ImageFor">For (ID)</label>
      <input class="form-control" type="text" id="ImageFor" maxlength="300" name="ImageFor" v-model="model.imageFor" />
    </div>

    <div class="form-group">
      <label class="control-label" for="ImageType">Type</label>
      <select class="form-control" type="text" id="ImageType" maxlength="300" name="ImageType" v-model="model.imageType">
        <option v-for="(key, value) in ImageType" :key="key" :value="Number(value)">{{key}}</option>
      </select>
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
