<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="giftCode">Code</label>
      <input class="form-control" type="text" required id="giftCode" name="giftCode" v-model="model.giftCode" />
    </div>

    <div class="form-group">
      <label class="control-label" for="giftName">Title</label>
      <input class="form-control" type="text" required id="giftName" name="giftName" v-model="model.giftName" />
    </div>

    <div class="form-group">
      <label class="control-label" for="price">Price</label>
      <input class="form-control" type="text" required id="price" name="price" v-model="model.price" />
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
