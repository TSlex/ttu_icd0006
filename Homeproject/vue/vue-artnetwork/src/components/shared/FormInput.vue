<template>
  <div :class="WrapClassName">
    <label v-if="label" class="control-label" :for="id">{{label}}</label>
    <input :class="ClassName" :type="Type" :id="id" :name="Name" v-model="Model" @input="onInput" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FormInput extends Vue {
  @Prop() className?: string;
  @Prop() id?: string;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() type?: string;

  @Prop({ default: true }) marginTop?: boolean;
  @Prop({ default: true }) wrap?: boolean;

  @Prop() model?: any;

  get ClassName() {
    let className = ["form-control"];

    if (this.className) {
      className.push(this.className);
    }

    return className.join(" ");
  }

  get Type() {
    return this.type ?? "text";
  }

  get Name() {
    return this.name ?? this.id;
  }

  get WrapClassName() {
    let className = [];

    if (this.wrap) {
      className.push("form-group");
    }

    if (this.marginTop) {
      className.push("mt-3");
    }

    return className.join(" ");
  }

  get Model() {
    return this.model;
  }

  //Vue, please go fuck yourself
  set Model(value: string) {
    if (value.length < 0) {
      this.model = value;
    }
  }

  onInput(event: Event) {
    this.$emit("model-change", [(event.target as HTMLInputElement).value]);
  }
}
</script>
