<template>
  <div class="preferences_section">
    <Modal v-if="isBlacklistModal" v-on:closeModal="closeBlacklist">
      <router-link
        v-for="profile in blacklist"
        :key="profile.userName"
        :to="`/profiles/${profile.userName}`"
        class="gallery_item"
      >
        <button class="item_controls btn-link" @click="deleteBlocked(profile)" @click.prevent>
          <i class="fas fa-times-circle"></i>
        </button>
        <ImageComponent :id="profile.profileAvatarId" :key="profile.profileAvatarId" height="100px" width="100px" />

        <span class="item_name">TSlex</span>
      </router-link>
    </Modal>
    <div class="row">
      <div class="col-md-4">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Avatar)">Change avatar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.ProfileData)">Edit profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Email)">Change email</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Password)">Change password</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Privacy)">Privacy and security</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="openBlacklist">Blacklist</a>
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <ManageAvatar v-if="currentPage === ManageNavs.Avatar" />
        <ManageEmail v-else-if="currentPage === ManageNavs.Email" />
        <ManagePassword v-else-if="currentPage === ManageNavs.Password" />
        <ManageSecurity v-else-if="currentPage === ManageNavs.Privacy" />
        <ManageProfileData v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import Modal from "../../components/Modal.vue";
import ManageAvatar from "./Components/Avatar.vue";
import ManageProfileData from "./Components/ProfileData.vue";
import ManageEmail from "./Components/Email.vue";
import ManagePassword from "./Components/Password.vue";
import ManageSecurity from "./Components/Security.vue";
import { ManageNav } from "./ManageNav";
import { IBlockedProfileDTO } from "../../types/IBlockedProfileDTO";
import { BlockedProfilesApi } from "../../services/BlockedProfilesApi";
import store from "@/store";
import { ResponseDTO } from "@/types/Response/ResponseDTO";

@Component({
  components: {
    ImageComponent,
    Modal,
    ManageAvatar,
    ManageProfileData,
    ManageEmail,
    ManagePassword,
    ManageSecurity
  }
})
export default class IdentityManage extends Vue {
  private currentPage: ManageNav = ManageNav.ProfileData;

  private isBlacklistModal: boolean = false;

  private blacklist: IBlockedProfileDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get ManageNavs() {
    return ManageNav;
  }

  openBlacklist() {
    BlockedProfilesApi.getBlockedProfiles(1, this.jwt).then(
      (response: IBlockedProfileDTO[]) => {
        this.blacklist = response;
        this.isBlacklistModal = true;
      }
    );
  }

  closeBlacklist() {
    this.isBlacklistModal = false;
  }

  deleteBlocked(profile: IBlockedProfileDTO) {
    store
      .dispatch("profileUnblock", profile.userName)
      .then((response: ResponseDTO) => {
        if (!response.errors) {
          this.blacklist.forEach((element: IBlockedProfileDTO, index) => {
            if (element.userName === profile.userName) {
              this.blacklist.splice(index, 1);
            }
          });
        }
      });
  }

  setPage(page: ManageNav) {
    this.currentPage = page;
  }
}
</script>
