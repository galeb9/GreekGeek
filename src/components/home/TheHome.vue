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
    PushupTypes,
  },
  computed: {
    myUsername(){
      return this.$store.getters.myUsername
    },
  },
  created(){
    if(this.myUsername === "user404"){
      this.$store.dispatch("getUserData")
    }else{
      console.log("Basic user data allready loaded from DB")
    }
    console.log(this.myUsername)
  }
}
</script>

<style lang="scss">

  .home{
    color: black;
  }
</style>