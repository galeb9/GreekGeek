<template>
  <div class="the-stats">
    <div class="stats__menu">
      <div
        :class="['stats__menu-item', { active1: currentTab === 'DailyStats' }]"
        @click="currentTab = 'DailyStats'"
      >
        Present
      </div>
      <div
        :class="['stats__menu-item', { active2: currentTab === 'PastStats' }]"
        @click="currentTab = 'PastStats'"
      >
        Past
      </div>
    </div>
    <transition name="fade-in" mode="out-in">
      <component :is="currentTab"></component>
    </transition>
  </div>
</template>

<script>
import DailyStats from "@/components/stats/present/DailyStats.vue";
import PastStats from "@/components/stats/past/PastStats.vue";

import {
  getUserDataAction,
  getUserDataState,
} from "@/mixins/pinia/main/getUserData";

export default {
  name: "TheStats",
  mixins: [getUserDataAction, getUserDataState],
  components: {
    DailyStats,
    PastStats,
  },
  data() {
    return {
      // currentTab: "DailyStats",
      currentTab: "PastStats",
      tabs: ["DailyStats", "PastStats"],
    };
  },
  created() {
    this.getUserData("pushups");
  },
};
</script>

<style lang="scss">
.the-stats {
  position: relative;
  .stats__menu {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2rem;
    .stats__menu-item {
      color: black;
      text-transform: uppercase;
      letter-spacing: 3px;
      padding: 1rem;
      color: grey;
      flex: 1;
      text-align: center;
    }
    .active1,
    .active2 {
      font-weight: 900;
      border-bottom: none;
      color: black;
      border-bottom: 1px solid black;
    }
  }
}
</style>
