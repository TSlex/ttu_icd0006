<template>
  <div>
    <button class="btn btn-primary mr-1" @click="$emit('view-edit')">{{$t('views.common.EditButton')}}</button>
    <button class="btn btn-primary" @click="$emit('back-to-list')">{{$t('views.common.BackToListButton')}}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DetailsControls extends Vue {
  @Prop() id!: string;
}
</script>
