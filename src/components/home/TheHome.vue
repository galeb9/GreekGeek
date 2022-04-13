<template>
  <div class="home">
    <div class="home__top">
      <HomeHead />
      <TheWelcome />
      <HomeStats />
    </div>

    <PushupTypes />
  </div>
</template>

<script>
import HomeHead from '@/components/home/HomeHead'
import TheWelcome from '@/components/home/welcome/TheWelcome'
import HomeStats from '@/components/home/home-stats/HomeStats'
import PushupTypes from '@/components/home/types/PushupTypes'



export default {
  name: 'TheHome',
  components:{
    HomeHead,
    TheWelcome,
    HomeStats,
    PushupTypes
  }
 
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

  .home{
    color: black;
  }
</style>