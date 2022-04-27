<template>
  <div class="home-stats">
    <HomeCalendar />
    <DailyProgress />
    <TheScoreboard />
  </div>
</template>

<script>
import HomeCalendar from '@/components/home/home-stats/HomeCalendar'
import DailyProgress from '@/components/home/home-stats/progress/DailyProgress'
import TheScoreboard from '@/components/home/home-stats/TheScoreboard'


export default {
  components:{
    HomeCalendar,
    DailyProgress,
    TheScoreboard
  }
}
</script>

<style lang="scss">
  .date{
    margin-top: 3rem
  }
</style>