<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="rankCode">Code</label>
      <input class="form-control" type="text" required id="rankCode" name="rankCode" v-model="model.rankCode" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="string">Title</label>
      <input class="form-control" type="text" required id="string" name="string" v-model="model.rankTitle" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankDescription">Description</label>
      <input class="form-control" type="text" required id="profileId" name="rankDescription" v-model="model.rankDescription" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankIcon">Icons</label>
      <input class="form-control" type="text" required id="rankIcon" name="rankIcon" v-model="model.rankIcon" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankColor">Color</label>
      <input class="form-control" type="text" required id="rankColor" name="rankColor" v-model="model.rankColor" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankTextColor">Text color</label>
      <input class="form-control" type="text" required id="rankTextColor" name="rankTextColor" v-model="model.rankTextColor" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="minExperience">Min experience</label>
      <input class="form-control" type="text" required id="minExperience" name="minExperience" v-model="model.minExperience" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="maxExperience">Max experience</label>
      <input class="form-control" type="text" required id="maxExperience" name="maxExperience" v-model="model.maxExperience" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="nextRankId">Next Rank (ID)</label>
      <input class="form-control" type="text" required id="nextRankId" name="nextRankId" v-model="model.nextRankId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="previousRankId">Previous Rank (ID)</label>
      <input class="form-control" type="text" required id="previousRankId" name="previousRankId" v-model="model.previousRankId" />
      <span class="text-danger field-validation-valid" data-valmsg-for="RankId" data-valmsg-replace="true"></span>
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
