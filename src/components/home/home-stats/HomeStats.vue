<template>
  <div class="home-stats">
    <HomeCalendar />
    <DailyProgress />
    <HomeArena />
    <TheScoreboard 
      :data="list"
      title="Daily Best"
    />
  </div>
</template>

<script>
import HomeCalendar from '@/components/home/home-stats/HomeCalendar'
import DailyProgress from '@/components/home/home-stats/progress/DailyProgress'
import TheScoreboard from '@/components/home/home-stats/TheScoreboard'
import HomeArena from '@/components/arena/HomeArena'
import { db } from '@/components/firebaseInit.js';


export default {
  components:{
    HomeCalendar,
    DailyProgress,
    TheScoreboard,
    HomeArena
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    getTopUsers(){ // top 5 users most pushups
      db.collection("users")
      .orderBy("pushupsToday","desc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          this.list.push({
            name: user.data().username,
            pushups: user.data().pushupsToday
          })
        });
      });
    },
  },
  created(){
    if(this.list.length < 1){
      this.getTopUsers();
    }
  }
}
</script>

<style lang="scss">
  .date{
    margin-top: 3rem
  }
</style>