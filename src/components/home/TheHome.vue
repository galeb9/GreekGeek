<template>
  <div class="home">
    <div class="home__top">
      <HomeHead />
      <TheWelcome />
      <HomeFriends />
      <HomeStats />
    </div>
    <PushupTypes />
    <TheHeader />
  </div>
</template>

<script>
import HomeHead from '@/components/home/HomeHead'
import TheWelcome from '@/components/home/welcome/TheWelcome'
import HomeStats from '@/components/home/home-stats/HomeStats'
import PushupTypes from '@/components/home/types/PushupTypes'
import TheHeader from '@/components/layout/TheHeader.vue'
import HomeFriends from '@/components/home/friends/HomeFriends.vue'

export default {
  name: 'TheHome',
  components:{
    HomeHead,
    TheWelcome,
    HomeStats,
    PushupTypes,
    TheHeader,
    HomeFriends
  }
 
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

  .home{
    color: black;
  }
</style>