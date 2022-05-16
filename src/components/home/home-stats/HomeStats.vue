<template>
  <div class="home-stats">
    <HomeCalendar />
    <DailyProgress />
    <HomeArena />
    <TheScoreboard />
  </div>
</template>

<script>
import HomeCalendar from '@/components/home/home-stats/HomeCalendar'
import DailyProgress from '@/components/home/home-stats/progress/DailyProgress'
import TheScoreboard from '@/components/home/home-stats/TheScoreboard'
import HomeArena from '@/components/arena/HomeArena'



export default {
  components:{
    HomeCalendar,
    DailyProgress,
    TheScoreboard,
    HomeArena
  }
}
</script>

<style lang="scss">
  .date{
    margin-top: 3rem
  }
</style>