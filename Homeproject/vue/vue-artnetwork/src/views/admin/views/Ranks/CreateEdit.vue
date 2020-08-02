<template>
  <div>
    <div class="form-group mt-3">
      <label class="control-label" for="rankCode">{{$t('bll.ranks.RankCode')}}*</label>
      <input class="form-control" type="text" required id="rankCode" name="rankCode" v-model="model.rankCode" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankTitle">{{$t('bll.ranks.RankTitle')}}*</label>
      <input class="form-control" type="text" required id="rankTitle" name="rankTitle" v-model="model.rankTitle" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankDescription">{{$t('bll.ranks.RankDescription')}}*</label>
      <input class="form-control" type="text" required id="profileId" name="rankDescription" v-model="model.rankDescription" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankIcon">{{$t('bll.ranks.RankIcon')}}</label>
      <input class="form-control" type="text" required id="rankIcon" name="rankIcon" v-model="model.rankIcon" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankColor">{{$t('bll.ranks.RankColor')}} [#000, #000000]*</label>
      <input class="form-control" type="text" required id="rankColor" name="rankColor" v-model="model.rankColor" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="rankTextColor">{{$t('bll.ranks.RankTextColor')}} [#000, #000000]*</label>
      <input class="form-control" type="text" required id="rankTextColor" name="rankTextColor" v-model="model.rankTextColor" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="minExperience">{{$t('bll.ranks.MinExperience')}}*</label>
      <input class="form-control" type="number" id="minExperience" name="minExperience" v-model.number="model.minExperience" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="maxExperience">{{$t('bll.ranks.MaxExperience')}}*</label>
      <input class="form-control" type="number" id="maxExperience" name="maxExperience" v-model.number="model.maxExperience" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="nextRankId">{{$t('bll.ranks.NextRankId')}}</label>
      <input class="form-control" type="text" required id="nextRankId" name="nextRankId" v-model="model.nextRankId" />
    </div>

    <div class="form-group mt-3">
      <label class="control-label" for="previousRankId">{{$t('bll.ranks.PreviousRankId')}}</label>
      <input class="form-control" type="text" required id="previousRankId" name="previousRankId" v-model="model.previousRankId" />
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
