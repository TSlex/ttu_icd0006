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

        <span class="item_name">{{profile.userName}}</span>
      </router-link>
    </Modal>
    <div class="row">
      <div class="col-md-4">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Avatar)">{{$t("views.identity.AvatarEditNav")}}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#/account/manage"
              @click="setPage(ManageNavs.ProfileData)"
            >{{$t("views.identity.ProfileEditNav")}}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Email)">{{$t("views.identity.EmailEditNav")}}</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#/account/manage"
              @click="setPage(ManageNavs.Password)"
            >{{$t("views.identity.PasswordEditNav")}}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="setPage(ManageNavs.Privacy)">{{$t("views.identity.PrivacyNav")}}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/account/manage" @click="openBlacklist">{{$t("views.identity.BlackListNav")}}</a>
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
    ManageSecurity,
  },
})
export default class IdentityManage extends Vue {
  @Prop()
  private startup!: string | null;

  private currentPage: ManageNav = this.resolveStartup;

  private isBlacklistModal: boolean = false;

  private blacklist: IBlockedProfileDTO[] = [];

  get jwt() {
    return store.getters.getJwt;
  }

  get ManageNavs() {
    return ManageNav;
  }

  get resolveStartup(): ManageNav {
    let result: ManageNav = ManageNav.ProfileData;

    for (let key in ManageNav) {
      let value: string = ManageNav[key as keyof typeof ManageNav];
      if (value === this.startup) {
        result = value as ManageNav;
      }
    }

    return result;
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
