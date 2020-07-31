
<template>
  <dl class="row">
    <dt class="col-sm-2">{{$t('bll.common.CreatedBy')}}</dt>
    <dd class="col-sm-10">{{model.createdBy}}</dd>

    <dt class="col-sm-2">{{$t('bll.common.CreatedAt')}}</dt>
    <dd class="col-sm-10">{{model.createdAt}}</dd>

    <dt class="col-sm-2">{{$t('bll.common.ChangedBy')}}</dt>
    <dd class="col-sm-10">{{model.changedBy}}</dd>

    <dt class="col-sm-2">{{$t('bll.common.ChangedAt')}}</dt>
    <dd class="col-sm-10">{{model.changedAt}}</dd>

    <dt class="col-sm-2">{{$t('bll.common.DeletedBy')}}</dt>
    <dd class="col-sm-10">{{model.deletedBy}}</dd>

    <dt class="col-sm-2">{{$t('bll.common.DeletedAt')}}</dt>
    <dd class="col-sm-10">{{model.deletedAt}}</dd>
  </dl>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MetaDetailsSection extends Vue {
  @Prop() model!: any;
}
</script>
