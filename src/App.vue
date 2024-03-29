<template>
  <main>
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="fade-in" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <transition name="move-in-bottom">
      <TheHeader v-if="showHeader(this.$route.fullPath)" class="header" />
    </transition>
  </main>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import { auth } from "@/scripts/firebaseInit.js";
import { getUserDataAction } from "@/mixins/pinia/main/getUserData";
import {
  notificationsAction,
  notificationsState,
} from "@/mixins/pinia/notifications/socialNotifications";

export default {
  name: "App",
  mixins: [getUserDataAction, notificationsAction, notificationsState],
  components: {
    TheHeader,
  },
  data() {
    return {
      headerVisible: true,
      loadActive: true,
      isLoggedIn: false,
      friendsCount: 0,
      myName: null,
    };
  },
  methods: {
    showHeader(route) {
      const acceptableRoutes = [
        "home",
        "friends",
        "profile",
        "add",
        "stats",
        "settings",
        "goal",
        "arena",
      ];
      for (let i = 0; i < acceptableRoutes.length; i++) {
        if (route === "/" + acceptableRoutes[i]) {
          return true;
        }
      }
    },
    loadInitialData() {
      this.myName = this.myUsername;
    },
    checkLoggedIn() {
      this.isLoggedIn = auth.currentUser ? true : false;
    },
    showProfileNotifications() {
      this.checkLoggedIn();
      if (this.isLoggedIn) this.profileNotificationsCheck();
    },
    firstTime() {
      // this is so you get data when you regiester
      // quick hack, find better solution
      if (window.history.state.back === "/register") {
        window.location.reload();
      }
    },
    invertTextColor(bgColor, lightColor, darkColor, changeBorder = 186) {
      const color =
        bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > changeBorder
        ? darkColor
        : lightColor;
    },
    checkForTheme() {
      const app = document.querySelector("#app").style;
      const bg = localStorage.getItem("bg");
      const complementary = localStorage.getItem("complementary");
      if (bg) {
        app.setProperty("--background", bg);
        app.setProperty("--color", this.invertTextColor(bg, "white", "black"));
      }
      if (complementary) app.setProperty("--complementary", complementary);
    },
  },
  created() {
    this.showProfileNotifications();
    this.firstTime();
    this.checkForTheme();
    this.getUserData();
    console.log("app reloaded");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;900&display=swap");

:root {
  --background: #e6eefa;
  --color: black;
  --oppositeColor: white; // color oposite to --color
  --shadowSmall: rgba(99, 99, 99, 0.39) 0px 2px 8px 0px;
  --complementary: black;
  --boxShadow: 5px 5px 10px rgba(0, 0, 0, 0.42);
  --radius: 4px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito Sans", sans-serif;
}

*:focus-visible {
  outline: 5px double black;
}

img {
  max-width: 100%;
}
a {
  text-decoration: none;
  color: inherit;
}
ul {
  list-style: none;
}

button,
img {
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: var(--background);
  color: var(--color);
  overflow: hidden;

  .basic-container {
    box-shadow: var(--boxShadow);
    margin-top: 2rem;
    padding: 25px 15px;
    border-radius: var(--radius);
  }

  main {
    margin: 0 auto;
    max-width: 1000px;
    .router-view {
      padding: 25px 15px;
    }
  }
}
</style>
