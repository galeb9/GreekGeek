<template>
  <div class="home-stats">
    <HomeCalendar />
    <TheScoreboard :data="list" title="Daily Best" />
    <HomeArena />
  </div>
</template>

<script>
import HomeCalendar from "@/components/home/home-stats/HomeCalendar";
import TheScoreboard from "@/components/home/home-stats/TheScoreboard";
import HomeArena from "@/components/arena/HomeArena";
import { db } from "@/scripts/firebaseInit.js";

export default {
  components: {
    HomeCalendar,
    TheScoreboard,
    HomeArena,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getTopUsers() {
      // top 5 users most pushups
      db.collection("users")
        .orderBy("pushupsToday", "desc")
        .limit(5)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((user) => {
            this.list.push({
              name: user.data().username,
              pushups: user.data().pushupsToday,
            });
          });
        });
    },
  },
  created() {
    if (this.list.length < 1) {
      this.getTopUsers();
    }
  },
};
</script>

<style lang="scss">
.date {
  margin-top: 3rem;
}
</style>
