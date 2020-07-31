<template>
  <div>
    <div class="form-group">
      <label class="control-label" for="RoleTitle">Название</label>
      <input
        class="form-control"
        type="text"
        id="RoleTitle"
        maxlength="200"
        name="RoleTitle"
        value="Member"
        v-model="Model.roleTitle"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="RoleTitleValue">Переведенное название [ru-RU]</label>
      <input
        class="form-control"
        type="text"
        id="RoleTitleValue"
        name="RoleTitleValue"
        value="Участник"
        v-model="Model.roleTitleValueId"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanRenameRoom">Может переменовывать чат?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanRenameRoom"
        name="CanRenameRoom"
        value="true"
        v-model="Model.canRenameRoom"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditMembers">Может менять роли участников?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditMembers"
        name="CanEditMembers"
        value="true"
        v-model="Model.canEditMembers"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanWriteMessages">Может писать в этот чат?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanWriteMessages"
        name="CanWriteMessages"
        value="true"
        v-model="Model.canWriteMessages"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditAllMessages">Может редактировать все сообщения?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditAllMessages"
        name="CanEditAllMessages"
        value="true"
        v-model="Model.canEditAllMessages"
      />
    </div>

    <div class="form-group">
      <label class="control-label" for="CanEditMessages">Может редактировать свои сообщения?</label>
      <input
        type="checkbox"
        class="form-control"
        id="CanEditMessages"
        name="CanEditMessages"
        value="true"
        v-model="Model.canEditMessages"
      />
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
