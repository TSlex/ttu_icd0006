<template>
  <AdminDetailsWrapper v-if="isLoaded" v-on:onEdit="onEdit" v-on:onBackToList="onBackToList">
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.common.Id')}}</dt>
      <dd class="col-sm-10">{{model.id}}</dd>
      <dt class="col-sm-2">{{$t('bll.chatroles.RoleTitleValueId')}}</dt>
      <dd class="col-sm-10">{{model.roleTitleValueId}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-3">{{$t('bll.chatroles.RoleTitle')}}</dt>
      <dd class="col-sm-7">{{model.roleTitle}}</dd>
      <dt class="col-sm-3">{{$t('bll.chatroles.RoleTitleValue')}} [{{CurrentCulture}}]</dt>
      <dd class="col-sm-7">{{model.roleTitleValue}}</dd>
    </dl>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">{{$t('bll.chatroles.CanRenameRoom')}}</dt>
      <dd class="col-sm-10">
        <input class="check-box" disabled="disabled" type="checkbox" :checked="model.canRenameRoom" />
      </dd>

      <dt class="col-sm-2">{{$t('bll.chatroles.CanEditMembers')}}</dt>
      <dd class="col-sm-10">
        <input class="check-box" disabled="disabled" type="checkbox" :checked="model.canEditMembers" />
      </dd>

      <dt class="col-sm-2">{{$t('bll.chatroles.CanWriteMessages')}}</dt>
      <dd class="col-sm-10">
        <input class="check-box" disabled="disabled" type="checkbox" :checked="model.canWriteMessages" />
      </dd>

      <dt class="col-sm-2">{{$t('bll.chatroles.CanEditAllMessages')}}</dt>
      <dd class="col-sm-10">
        <input class="check-box" disabled="disabled" type="checkbox" :checked="model.canEditAllMessages" />
      </dd>

      <dt class="col-sm-2">{{$t('bll.chatroles.CanEditMessages')}}</dt>
      <dd class="col-sm-10">
        <input class="check-box" disabled="disabled" type="checkbox" :checked="model.canEditMessages" />
      </dd>
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

import { IChatRoleAdminDTO } from "@/types/IChatRoleDTO";

import { ChatRolesApi } from "@/services/admin/ChatRolesApi";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";
import AdminDetails from "../../components/shared/base/AdminDetails.vue";
import EventBus from "@/events/EventBus";

@Component
export default class ChatRolesDetailsA extends AdminDetails<IChatRoleAdminDTO> {
  get CurrentCulture() {
    return store.getters.getCurrentCulture;
  }

  loadData() {
    this.isLoaded = false;

    ChatRolesApi.details(this.Id, this.jwt).then(
      (response: IChatRoleAdminDTO) => {
        this.model = response;
        this.isLoaded = true;
      }
    );
  }

  created() {
    this.modelName = "ChatRole";

    EventBus.$on("cultureUpdate", (culture: string) => {
      this.loadData();
    });
  }

  mounted() {
    this.loadData();
  }
}
</script>
