<template>
  <div class="home">
    <div class="home__top">
      <HomeHead />
      <TheWelcome />
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

export default {
  name: 'TheHome',
  components:{
    HomeHead,
    TheWelcome,
    HomeStats,
    PushupTypes,
    TheHeader,
  },

 
}
</script>

<style lang="scss">

  .home{
    color: black;
  }
</style>