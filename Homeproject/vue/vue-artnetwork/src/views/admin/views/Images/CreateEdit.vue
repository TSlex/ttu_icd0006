<template>
  <div class="mt-2">
    <div class="form-group">
      <label class="control-label" for="imageFor">{{$t('bll.images.ImageFor')}}</label>
      <input class="form-control" type="text" id="imageFor" maxlength="300" name="imageFor" v-model="model.imageFor" />
    </div>

    <div class="form-group">
      <label class="control-label" for="imageType">{{$t('bll.images.ImageType')}}</label>
      <select class="form-control" type="text" id="imageType" maxlength="300" name="imageType" v-model="model.imageType">
        <option v-for="(key, value) in ImageType" :key="key" :value="Number(value)">{{key}}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IRankAdminDTO } from "@/types/IRankDTO";
import { ImageType } from "@/types/Enums/ImageType";

@Component({
  components: {},
})
export default class CreateEdit extends Vue {
  @Prop() model!: IRankAdminDTO;

  get ImageType() {
    return Object.keys(ImageType).filter((key) => {
      return isNaN(Number(key));
    });
  }
}
</script>

<style>
</style>
