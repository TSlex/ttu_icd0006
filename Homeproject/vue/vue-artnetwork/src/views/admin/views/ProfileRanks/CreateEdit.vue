<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="profileId">Profile (ID)</label>
      <input class="form-control" type="text" required id="profileId" name="profileId" v-model="model.profileId" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankId">Rank (ID)</label>
      <input class="form-control" type="text" required id="rankId" name="rankId" v-model="model.rankId" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IProfileRankAdminDTO } from "@/types/IProfileRankDTO";

@Component({
  components: {},
})
export default class CreateEdit extends Vue {
  @Prop() model!: IProfileRankAdminDTO;
}
</script>

<style>
</style>
