<template>
  <div class="home-page__container" >
    <div class="home-page">
      <div class="home-page__top"> 
        <HomeHead />
        <TheWelcome />
        <HomeStats />
      </div>
      <PushupTypes />
    </div>
    <transition name="fade-in" mode="out-in">
      <Loader v-if="myUsername === null || myUsername === 'user404'" type="fullscreen" />
    </transition>
  </div>


</template>

<script>
import HomeHead from '@/components/home/HomeHead'
import TheWelcome from '@/components/home/welcome/TheWelcome'
import HomeStats from '@/components/home/home-stats/HomeStats'
import PushupTypes from '@/components/home/types/PushupTypes'
import Loader from '@/components/UI/LoaderThingy.vue'

export default {
  name: 'TheHome',
  components:{
    HomeHead,
    TheWelcome,
    HomeStats,
    PushupTypes,
    Loader
  },
  computed: {
    myUsername (){
      return this.$store.getters.myUsername
    },
  },
  created () { // checks if user logged call user data from db
    if (this.myUsername === "user404"){
      this.$store.dispatch("getUserData")
      this.$store.dispatch("getMyFriendsCount")
    } else {
      console.log("Basic user data allready loaded from DB")
    }
  }
}
</script>