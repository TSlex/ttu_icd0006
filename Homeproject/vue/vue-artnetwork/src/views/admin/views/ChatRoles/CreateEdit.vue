<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="roleTitle">{{$t('bll.chatroles.RoleTitle')}}</label>
      <input class="form-control" type="text" id="roleTitle" maxlength="200" name="roleTitle" v-model="model.roleTitle" />
    </div>

    <div class="form-group">
      <label class="control-label" for="RoleTitleValue">{{$t('bll.chatroles.RoleTitleValue')}} [{{CurrentCulture}}]</label>
      <input class="form-control" type="text" id="RoleTitleValue" name="RoleTitleValue" v-model="model.roleTitleValue" />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanRenameRoom">{{$t('bll.chatroles.CanRenameRoom')}}</label>
      <input type="checkbox" class="form-control" id="CanRenameRoom" name="CanRenameRoom" v-model="model.canRenameRoom" />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditMembers">{{$t('bll.chatroles.CanEditMembers')}}</label>
      <input type="checkbox" class="form-control" id="CanEditMembers" name="CanEditMembers" v-model="model.canEditMembers" />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanWriteMessages">{{$t('bll.chatroles.CanWriteMessages')}}</label>
      <input type="checkbox" class="form-control" id="CanWriteMessages" name="CanWriteMessages" v-model="model.canWriteMessages" />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditAllMessages">{{$t('bll.chatroles.CanEditAllMessages')}}</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditAllMessages"
        name="CanEditAllMessages"
        v-model="model.canEditAllMessages"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditMessages">{{$t('bll.chatroles.CanEditMessages')}}</label>
      <input type="checkbox" class="form-control" id="CanEditMessages" name="CanEditMessages" v-model="model.canEditMessages" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IRankAdminDTO } from "@/types/IRankDTO";
import store from "@/store";

@Component({
  components: {},
})
export default class CreateEdit extends Vue {
  @Prop() model!: IRankAdminDTO;

  get CurrentCulture() {
    return store.getters.getCurrentCulture;
  }
}
</script>

<style>
</style>
