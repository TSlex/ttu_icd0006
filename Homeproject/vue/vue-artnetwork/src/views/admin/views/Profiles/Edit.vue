<template>
  <AdminEditWrapper
    v-if="isLoaded"
    v-on:model-submit="onSubmit"
    v-on:back-to-list="onBackToList"
    :errors="errors"
    :ignoreTopColStyle="true"
  >
    <ImageMiniature :initialId="imageModel.id" :htmlStyle="'width: 20rem !important'" ref="miniature" />

    <div class="col-md-4 mt-4">
      <ImageForm :imageModel="imageModel" v-on:file-load="loadImage" />

      <div class="mt-3">
        <div class="form-group">
          <label class="control-label" for="userName">{{$t('bll.profiles.UserName')}}*</label>
          <input class="form-control" type="text" id="userName" name="userName" v-model="model.userName" />
        </div>
        <div class="form-group">
          <label class="control-label" for="email">{{$t('bll.profiles.Email')}}*</label>
          <input class="form-control" type="text" id="email" name="email" v-model="model.email" />
        </div>
        <div class="form-group">
          <label class="control-label" for="phoneNumber">{{$t('bll.profiles.PhoneNumber')}}</label>
          <input class="form-control" type="text" id="phoneNumber" name="phoneNumber" v-model="model.phoneNumber" />
        </div>
        <div class="form-group">
          <label class="control-label text-danger" for="password">{{$t('bll.profiles.Password')}}</label>
          <input class="form-control" type="text" id="password" name="password" v-model="model.password" />
        </div>
        <div class="form-group">
          <label class="control-label" for="profileFullName">{{$t('bll.profiles.ProfileFullName')}}</label>
          <input class="form-control" type="text" id="profileFullName" name="profileFullName" v-model="model.profileFullName" />
        </div>
        <div class="form-group">
          <label class="control-label" for="profileWorkPlace">{{$t('bll.profiles.ProfileWorkPlace')}}</label>
          <input class="form-control" type="text" id="profileWorkPlace" name="profileWorkPlace" v-model="model.profileWorkPlace" />
        </div>
        <div class="form-group">
          <label class="control-label" for="experience">{{$t('bll.profiles.Experience')}}*</label>
          <input class="form-control" type="number" id="experience" name="experience" v-model.number="model.experience" />
        </div>
        <div class="form-group">
          <label class="control-label" for="profileAbout">{{$t('bll.profiles.ProfileAbout')}}</label>
          <input class="form-control" type="text" id="profileAbout" name="profileAbout" v-model="model.profileAbout" />
        </div>
        <div class="form-group">
          <label class="control-label" for="profileGender">{{$t('bll.profiles.ProfileGender')}}*</label>
          <select type="number" class="form-control" id="profileGender" name="profileGender" v-model.number="model.profileGender">
            <option value="0">{{resolveGender(ProfileGender.Male)}}</option>
            <option value="1">{{resolveGender(ProfileGender.Female)}}</option>
            <option value="127">{{resolveGender(ProfileGender.Own)}}</option>
            <option value="128">{{resolveGender(ProfileGender.Undefined)}}</option>
          </select>
        </div>
        <div v-if="Number(model.profileGender) === 127" class="form-group">
          <label class="control-label" for="profileGenderOwn">{{$t('bll.profiles.ProfileGenderOwn')}}*</label>
          <input class="form-control" type="text" id="profileGenderOwn" name="profileGenderOwn" v-model="model.profileGenderOwn" />
        </div>
        <div class="form-group">
          <label class="control-label" for="profileStatus">{{$t('bll.profiles.ProfileStatus')}}</label>
          <input class="form-control" type="text" id="profileStatus" name="profileStatus" v-model="model.profileStatus" />
        </div>
        <div class="form-group">
          <label class="control-label" for="phoneNumberConfirmed">{{$t('bll.profiles.PhoneNumberConfirmed')}}</label>
          <input
            type="checkbox"
            class="form-control"
            id="phoneNumberConfirmed"
            name="phoneNumberConfirmed"
            v-model="model.phoneNumberConfirmed"
          />
        </div>
        <div class="form-group">
          <label class="control-label" for="lockoutEnabled">{{$t('bll.profiles.LockoutEnabled')}}</label>
          <input type="checkbox" class="form-control" id="emailConfirmed" name="emailConfirmed" v-model="model.lockoutEnabled" />
        </div>
        <div class="form-group">
          <label class="control-label" for="emailConfirmed">{{$t('bll.profiles.EmailConfirmed')}}</label>
          <input type="checkbox" class="form-control" id="emailConfirmed" name="emailConfirmed" v-model="model.emailConfirmed" />
        </div>
        <div class="form-group">
          <label class="control-label" for="accessFailedCount">{{$t('bll.profiles.AccessFailedCount')}}</label>
          <input
            class="form-control"
            type="number"
            id="accessFailedCount"
            name="accessFailedCount"
            v-model.number="model.accessFailedCount"
          />
        </div>
      </div>
    </div>
  </AdminEditWrapper>
  <LoadingOverlay v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ImageType } from "@/types/Enums/ImageType";

import store from "@/store";

import { IProfileAdminDTO } from "@/types/IProfileDTO";
import { IImageDTO, IImagePostDTO, IImageAdminDTO } from "@/types/IImageDTO";
import { ResponseDTO } from "../../../../types/Response/ResponseDTO";

import { ProfilesApi } from "@/services/admin/ProfilesApi";
import AdminEdit from "../../components/shared/base/AdminEdit.vue";

import { resolveGender } from "@/translations/gender";
import { ProfileGender } from "@/types/Enums/ProfileGender";

import ImageForm from "@/components/image/ImageForm.vue";
import ImageMiniature from "@/components/image/ImageMiniature.vue";

import { createEmptyGuid } from "@/helpers/guid";
import { ImagesApi } from "@/services/admin/ImagesApi";
import { requireError } from "@/translations/validation";

@Component({
  components: {
    ImageForm,
    ImageMiniature,
  },
})
export default class ProfilesEditA extends AdminEdit<IProfileAdminDTO> {
  private imageModel: IImageAdminDTO | null = null;

  get isImageExist() {
    return this.model?.profileAvatarId != null;
  }

  get ProfileGender() {
    return ProfileGender;
  }

  loadImage(file: File) {
    this.imageModel!.imageFile = file;
    (this.$refs.miniature as ImageMiniature).loadImage(file);
  }

  resolveGender(gender: ProfileGender) {
    return resolveGender(gender);
  }

  created() {
    this.modelName = "Profile";

    ProfilesApi.details(this.Id, this.jwt).then(
      (response: IProfileAdminDTO) => {
        this.model = response;

        if (this.isImageExist) {
          ImagesApi.details(response.profileAvatarId!, this.jwt).then(
            (response: IImageAdminDTO) => {
              this.imageModel = response;
              this.isLoaded = true;
            }
          );
        } else {
          this.imageModel = {
            id: createEmptyGuid(),
            imageUrl: "",
            originalImageUrl: "",
            heightPx: 0,
            widthPx: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            imageFile: null,
            imageType: ImageType.ProfileAvatar,
            imageFor: this.model.id,
            masterId: null,
            createdBy: null,
            createdAt: new Date(),
            changedBy: null,
            changedAt: new Date(),
            deletedBy: null,
            deletedAt: null,
          };

          this.isLoaded = true;
        }
      }
    );
  }

  onSubmit() {
    this.errors = [];

    if (!this.model!.userName) {
      this.errors.push(requireError("bll.profiles.UserName"));
    }
    if (!this.model!.email) {
      this.errors.push(requireError("bll.profiles.Email"));
    }
    if (
      Number(this.model!.profileGender) === 127 &&
      !this.model!.profileGenderOwn
    ) {
      this.errors.push(requireError("bll.profiles.ProfileGenderOwn"));
    }

    if (!this.isImageExist && this.imageModel!.imageFile === null) {
      this.errors.push(this.$t("bll.images.ImageRequired").toString());
    }

    if (this.errors.length > 0) return;

    if (this.isImageExist) {
      ImagesApi.edit(this.imageModel!.id, this.imageModel!, this.jwt).then(
        () => {
          ProfilesApi.edit(this.Id, this.model!, this.jwt).then(
            (response: ResponseDTO) => {
              if (response?.errors) {
                this.errors = response.errors;
              } else {
                this.$router.go(-1);
              }
            }
          );
        }
      );
    } else if (this.imageModel!.imageFile) {
      ImagesApi.create(this.imageModel!, this.jwt).then(
        (response: IImageAdminDTO) => {
          this.model!.profileAvatarId = response.id;
          ProfilesApi.edit(this.Id, this.model!, this.jwt).then(
            (response: ResponseDTO) => {
              if (response?.errors) {
                this.errors = response.errors;
              } else {
                this.$router.go(-1);
              }
            }
          );
        }
      );
    }
  }
}
</script>
