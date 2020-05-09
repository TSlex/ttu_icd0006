<template>
  <div class="preferences_section">
    <div class="row">
      <div class="col-md-4">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#">No title</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Chat with admin</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">string</a>
          </li>
        </ul>
      </div>
      <div class="col-md-8">Here will be JS-rendered messages</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ImageComponent from "../../components/Image.vue";
import store from "@/store";

@Component({
  components: {
    ImageComponent
  }
})
export default class ChatRoom extends Vue {
  private pageToLoad = 2;
  private isFetching = false;

  scrollTop() {
    document.documentElement.scrollTop = 0;
  }

  scroll() {
    window.onscroll = (e: Event) => {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight >
        document.documentElement.offsetHeight - 1400;

      let toUpButton = document.getElementById("toUpButton")!;

      if (document.documentElement.scrollTop > 100) {
        toUpButton.style.display = "initial";
      } else {
        toUpButton.style.display = "none";
      }

      if (bottomOfWindow && this.canLoadMore && !this.isFetching) {
        this.isFetching = true;
        store.dispatch("getFeed", this.pageToLoad);
        this.pageToLoad += 1;
        // console.log(this.pageToLoad);
      }
    };
  }

  get canLoadMore(): boolean {
    return store.state.feedLoadedCount === 10;
  }

  beforeCreate(): void {
    console.log("beforeCreate");
  }

  created(): void {
    console.log("created");
  }

  beforeMount(): void {
    console.log("beforeMount");
  }

  mounted(): void {
    console.log("mounted");
    // this.scroll();
  }

  beforeUpdate(): void {
    console.log("beforeUpdate");
  }

  updated(): void {
    console.log("updated");
  }

  beforeDestroy(): void {
    console.log("beforeDestroy");
  }

  destroyed(): void {
    console.log("destroyed");
  }
}
</script>
