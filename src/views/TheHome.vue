<template>
  <div class="home-page__container">
    <div class="home-page">
      <div class="home-page__top">
        <HomeHead />
        <TheWelcome />
        <HomeStats />
      </div>
      <PushupTypes />
    </div>
    <transition name="fade-in" mode="out-in">
      <Loader v-if="!username" type="fullscreen" />
    </transition>
  </div>
</template>

<script>
import HomeHead from "@/components/home/HomeHead";
import TheWelcome from "@/components/home/welcome/TheWelcome";
import HomeStats from "@/components/home/home-stats/HomeStats";
import PushupTypes from "@/components/home/types/PushupTypes";
import Loader from "@/components/UI/LoaderThingy.vue";

// pinia

import {
  getUserDataAction,
  getUserDataState,
} from "@/mixins/pinia/main/getUserData";

import { myProfileAction } from "@/mixins/pinia/profile/myProfile";

export default {
  name: "TheHome",
  mixins: [getUserDataAction, getUserDataState, myProfileAction],
  components: {
    HomeHead,
    TheWelcome,
    HomeStats,
    PushupTypes,
    Loader,
  },
  created() {
    // vuex implementation
    // if (this.myUsername === "user404") {
    //   this.$store.dispatch("getUserData");
    //   this.$store.dispatch("getMyFriendsCount");
    // } else {
    //   console.log("Basic user data allready loaded from DB");
    // }

    // pinia solution
    this.getUserData();
    this.getMyFriendsCount();
  },
};
</script>
