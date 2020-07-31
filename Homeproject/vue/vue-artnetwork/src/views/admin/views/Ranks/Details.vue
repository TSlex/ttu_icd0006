<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.RankTitleId')}}</dt>
      <dd class="col-sm-10">{{model.rankTitleId}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.RankDescriptionId')}}</dt>
      <dd class="col-sm-10">{{model.rankDescriptionId}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.PreviousRankId')}}</dt>
      <dd class="col-sm-10">{{model.previousRankId}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.NextRankId')}}</dt>
      <dd class="col-sm-10">{{model.nextRankId}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.ranks.RankTitle')}}</dt>
      <dd class="col-sm-10">{{model.rankTitle}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.RankDescription')}}</dt>
      <dd class="col-sm-10">{{model.rankDescription}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.ranks.RankCode')}}</dt>
      <dd class="col-sm-10">{{model.rankCode}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.RankColor')}}</dt>
      <dd class="col-sm-10" :style="`background-color: ${model.rankColor}`"></dd>
      <dt class="col-sm-2">{{$t('bll.ranks.RankTextColor')}}</dt>
      <dd class="col-sm-10" :style="`background-color: ${model.rankTextColor}`"></dd>
      <dt class="col-sm-2">{{$t('bll.ranks.RankIcon')}}</dt>
      <dd class="col-sm-10">
        <icon v-for="(icon, index) in Icons" :key="index" :class="`fa fa-${icon}`"></icon>
      </dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.ranks.MinExperience')}}</dt>
      <dd class="col-sm-10">{{model.minExperience}}</dd>
      <dt class="col-sm-2">{{$t('bll.ranks.MaxExperience')}}</dt>
      <dd class="col-sm-10">{{model.maxExperience}}</dd>
    </dl>
    <hr />
    <MetaDetailsSection :model="model" />
  </AdminDetailsWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";

import ImageComponent from "@/components/Image.vue";

import { IRankAdminDTO } from "@/types/IRankDTO";

import { RanksApi } from "@/services/admin/RanksApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import AdminDetails from "@/views/admin/components/shared/base/AdminDetails.vue";
import EventBus from "@/events/EventBus";

@Component({
  components: {
    AdminDetails,
  },
})
export default class RanksDetailsA extends AdminDetails<IRankAdminDTO> {
  @Prop() protected id!: string;

  get Id() {
    return this.id;
  }

  get Icons() {
    return this.model?.rankIcon?.split(";").filter((s) => s !== "") ?? [];
  }

  loadData() {
    this.isLoaded = false;

    RanksApi.details(this.Id, this.jwt).then((response: IRankAdminDTO) => {
      this.model = response;
      this.isLoaded = true;
    });
  }

  created() {
    this.modelName = "Rank";

    EventBus.$on("cultureUpdate", (culture: string) => {
      this.loadData();
    });
  }

  mounted() {
    this.loadData();
  }
}
</script>
