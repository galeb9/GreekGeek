<template>
  <div class="home-stats">
    <HomeCalendar />
    <!-- <p class="date">{{ new Date() }}</p> -->
    <DailyProgress />
  </div>
</template>

<script>
import HomeCalendar from '@/components/home/home-stats/HomeCalendar'
import DailyProgress from '@/components/home/home-stats/progress/DailyProgress'

export default {
  components:{
    HomeCalendar,
    DailyProgress
  }
}
</script>

<style lang="scss">
  .date{
    margin-top: 3rem
  }
</style>