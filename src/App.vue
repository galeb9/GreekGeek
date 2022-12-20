<template>
  <main>
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="fade-in" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <transition name="move-in-bottom">
      <TheHeader v-if="showHeader(this.$route.fullPath)" class="header" />
    </transition>

  </main>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue'
import { auth } from '@/components/firebaseInit.js'

export default {
  name: 'App',
  components: { 
    TheHeader,
  },
  data(){
    return{
      headerVisible: true,
      loadActive: true,
      isLoggedIn: false,
      friendsCount: 0,
      myName: null
    }
  },
  watch: {
    myUsername () {
      this.myName = this.myUsername;
    }
  },
  computed: {
    myUsername(){
      return this.$store.getters.myUsername
    },
    myFriendsCount() {
      return this.$store.getters.myFriendsCount
    }
  },
  methods: {
    showHeader(route) {
      const acceptableRoutes = ['home','friends','profile','add','stats','settings','goal','arena']
      for(let i = 0; i < acceptableRoutes.length; i++) {
        if(route === ('/' + acceptableRoutes[i]) ) {
          return true
        }
      }
    },
    loadInitialData() {
      this.myName = this.myUsername;
    },
    loadData() {
        if(auth.currentUser) {
          this.$store.dispatch("getMyFriendsCount")
          this.myUsername === "user404" ? this.$store.dispatch("getUserData") : console.log("Basic user data allready loaded from DB")
        }
        setTimeout(() => {
          console.log(this.myFriendsCount)  
        }, 1400);
    },
    checkLoggedIn() {
      this.isLoggedIn = auth.currentUser ? true : false
    },
    showProfileNotifications() {
      this.checkLoggedIn()
      if(this.isLoggedIn) this.$store.dispatch("profileNotificationsCheck")
    },
    firstTime() {
      if(window.history.state.back === "/register") {
        window.location.reload()
      } 
    }
  }, 
  created(){
    this.showProfileNotifications()
    this.firstTime()
    // setTimeout(() => this.loadData(), 1000);
    // console.log(this.isLoggedIn)
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;900&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: $bg;
  // color: $fontColor;
  overflow: hidden;
  main{
    margin: 0 auto;
    max-width: 1000px;
  }
}

img{
  max-width: 100%;
}
.gif{
  border-radius: $radius;
  margin: 1rem 0;
}
a{
  text-decoration: none;
  color:inherit;
}
ul{
  list-style: none;
}
.router-view{
  padding: 1.5rem 1.3rem ;
}
button, img{
  cursor: pointer
}







</style>
