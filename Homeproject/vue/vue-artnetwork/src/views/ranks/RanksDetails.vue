<template>
  <Modal v-on:closeModal="$emit('onCloseRankDetails')">
    <div class="d-flex flex-column align-items-center text-center" style="position: relative; padding: 20px">
      <div
        class="progress_container"
        :style="`background: conic-gradient(${rank.rankColor} ${rankPercent}%, #FFFFFF ${rankPercent + 5}%) 50% 50% / 100% 100% no-repeat;`"
      >
        <div class="progress_container_front">
          <span class="progress_value">{{rankPercent}}%</span>
        </div>
      </div>
      <span class="mt-4" :style="`color: ${rank.rankTextColor}; font-size: 24px; font-family: Consolas, serif`">{{rank.rankTitle}}</span>
      <hr style="width: 400px" />
      <span
        style="display: inline-block; max-width: 600px; word-break: break-all; word-break: break-word;"
      >{{rank.rankDescription}}</span>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import Modal from "@/components/Modal.vue";
import { IRankDTO } from "../../types/IRankDTO";

@Component({
  components: {
    Modal
  }
})
export default class RanksDetails extends Vue {
  get rankPercent(): number {
    return store.getters.getRankPercent;
  }

  get rank(): IRankDTO | null {
    return store.state.profileRank!;
  }
}
</script>

<style>
</style>
