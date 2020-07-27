<template>
  <div :style="ModalStyle">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">{{$t("views.common.Loading")}}</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class LoadingOverlay extends Vue {
  @Prop({ default: true }) public fixed!: boolean;

  @Prop({ default: "" }) public modalStyle!: string;

  get IsFixed() {
    return this.fixed === true;
  }

  get ModalStyle() {
    let style =
      "left: 0px; top: 0px; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.133);";

    if (this.IsFixed) {
      style = "position: fixed; " + style;
    } else {
      style = "position: absolute; " + style;
    }

    if (this.modalStyle) {
      style = style + this.modalStyle;
    }

    return style;
  }
}
</script>

<style>
</style>
