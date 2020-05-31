<template>
  <div class="admin_panel">
    <div class="panel_section">
      <h4>Profile:</h4>
      <router-link class="btn btn-primary" to="/admin/profiles">Profiles</router-link>
      <router-link class="btn btn-primary" to="/admin/profilegifts">Profile gifts</router-link>
      <router-link class="btn btn-primary" to="/admin/profileranks">Profile ranks</router-link>
      <router-link class="btn btn-primary" to="/admin/favorites">Favorites</router-link>
      <router-link class="btn btn-primary" to="/admin/followers">Followers</router-link>
      <router-link class="btn btn-primary" to="/admin/blockedprofiles">Blocked profiles</router-link>
    </div>
    <div class="panel_section">
      <h4>Image:</h4>
      <router-link class="btn btn-primary" to="/admin/images">Images</router-link>
    </div>
    <div class="panel_section">
      <h4>Chat:</h4>
      <router-link class="btn btn-primary" to="/admin/chatrooms">Chat rooms</router-link>
      <router-link class="btn btn-primary" to="/admin/chatmembers">Chat members</router-link>
      <router-link class="btn btn-primary" to="/admin/messages">Messages</router-link>
    </div>
    <div class="panel_section">
      <h4>Post:</h4>
      <router-link class="btn btn-primary" to="/admin/posts">Posts</router-link>
      <router-link class="btn btn-primary" to="/admin/comments">Comments</router-link>
    </div>
    <div class="panel_section">
      <h4>Misc:</h4>
      <router-link class="btn btn-primary" to="/admin/chatroles">Chat roles</router-link>
      <router-link class="btn btn-primary" to="/admin/ranks">Ranks</router-link>
      <router-link class="btn btn-primary" to="/admin/gifts">Gifts</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AdminPanel extends Vue {
  created() {
    console.log("created");
  }
}
</script>
