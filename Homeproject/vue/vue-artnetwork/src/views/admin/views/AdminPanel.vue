<template>
  <div class="admin_panel">
    <div class="panel_section">
      <h4>{{$t('views.common.AdminProfileSectionHeader')}}:</h4>
      <router-link class="btn btn-primary" to="/admin/profiles">{{$t('views.common.AdminProfilesHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/profilegifts">{{$t('views.common.AdminProfileGiftsHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/profileranks">{{$t('views.common.AdminProfileRanksHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/favorites">{{$t('views.common.AdminFavoritesHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/followers">{{$t('views.common.AdminFollowersHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/blockedprofiles">{{$t('views.common.AdminBlockedProfilesHeader')}}</router-link>
    </div>
    <div class="panel_section">
      <h4>{{$t('views.common.AdminImageSectionHeader')}}:</h4>
      <router-link class="btn btn-primary" to="/admin/images">{{$t('views.common.AdminImagesHeader')}}</router-link>
    </div>
    <div class="panel_section">
      <h4>{{$t('views.common.AdminChatSectionHeader')}}:</h4>
      <router-link class="btn btn-primary" to="/admin/chatrooms">{{$t('views.common.AdminChatRoomsHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/chatmembers">{{$t('views.common.AdminChatMembersHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/messages">{{$t('views.common.AdminMessagesHeader')}}</router-link>
    </div>
    <div class="panel_section">
      <h4>{{$t('views.common.AdminPostSectionHeader')}}:</h4>
      <router-link class="btn btn-primary" to="/admin/posts">{{$t('views.common.AdminPostsHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/comments">{{$t('views.common.AdminCommentsHeader')}}</router-link>
    </div>
    <div class="panel_section">
      <h4>{{$t('views.common.AdminMiscSectionHeader')}}:</h4>
      <router-link class="btn btn-primary" to="/admin/chatroles">{{$t('views.common.AdminChatRolesHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/ranks">{{$t('views.common.AdminRanksHeader')}}</router-link>
      <router-link class="btn btn-primary" to="/admin/gifts">{{$t('views.common.AdminGiftsHeader')}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AdminPanel extends Vue {}
</script>
