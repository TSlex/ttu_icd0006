<template>
  <div v-if="isLoaded">
    <a v-if="isImage" :href="messageValue">
      <img :src="messageValue" alt="profile" height="auto" width="200px" style="border-radius: 5px" />
    </a>
    <span v-else class="message_value">{{messageValue}}</span>
  </div>
  <LoadingOverlay v-else :fixed="false" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Axios from "axios";
import IdentityStore from "@/components/shared/IdentityStore.vue";

@Component({
  components: {},
})
export default class Message extends IdentityStore {
  @Prop() messageValue!: string;

  private isImage = false;

  async isImageUrl(url: string): Promise<boolean> {
    if (!url.startsWith("http")) return false;

    let result = false;
    const axios = Axios.create({ validateStatus: () => true });

    try {
      await axios.get(url).then((response) => {
        switch (response.status) {
          case 200:
            result = (response.headers["content-type"] as string)
              .toLowerCase()
              .startsWith("image/");
            break;
          case 404:
            return false;
          default:
            return false;
        }
      });
    } catch (e) {
      return false;
    }

    return result;
  }

  created() {
    this.isImageUrl(this.messageValue).then((result: boolean) => {
      if (result) {
        this.isImage = true;
      }
      this.isLoaded = true;
    });
  }
}
</script>

<style>
</style>
