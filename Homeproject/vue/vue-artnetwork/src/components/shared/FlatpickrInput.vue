<template>
  <div>
    <flat-pickr class="form-control" v-model="Value" @on-change="_onChange" :config="config"></flat-pickr>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { resolveConfig } from "@/translations/flatpickr";
import moment from "moment-timezone";

@Component({
  components: {},
})
export default class FlatpickrInput extends Vue {
  @Prop() onChange!: (value: string) => void;
  @Prop() value!: string | Date;

  private _value!: string | Date;

  get config() {
    return resolveConfig();
  }

  get Value() {
    return this._value;
  }

  set Value(value: any) {}

  created() {
    this._value = this.value;
  }

  _onChange(value: Date[]) {
    this.onChange(moment(value[0]).format("YYYY-MM-DD[T]HH:mm:ss.SSS"));
  }
}
</script>
