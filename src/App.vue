<template>
  <main>
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="fade-in" mode="out-in">
        <!-- <component :is="logComponent(Component, Component.type.name)" /> -->
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- <TheHeader v-if="headerVisible" class="header" /> -->
    <transition name="move-in-bottom">
      <TheHeader v-if="false" class="header" />
    </transition>

    <transition name="fade-in" mode="out-in">
      <Loader v-if="loadActive" />
    </transition>
  </main>
</template>

<script>
import Loader from '@/components/UI/LoadFullscreen.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import { db } from '@/components/firebaseInit.js'



export default {
  name: 'App',
  components: { 
    TheHeader,
    Loader
  },
  data(){
    return{
      headerVisible: true,
      loadActive: true

    }
  },
  methods: {
    logComponent(comp, val) {
      console.logv(val)
      if (val === 'LoginForm' || val === 'RegisterForm'){
        this.headerVisible = false
      } else {
        this.headerVisible = true
      }
      return comp
    },
    async isUsernameOk(username){
      const userData = await db.collection("users")
        .where("username", "==", username)
        .get()
        .then(snapshot => {
            const arr = []
            snapshot.forEach(user => {
                arr.push(user.data().username)
            })
            return arr
        })
      console.log(userData)
    },
    loadAnimation(){

    }
  }, 
  created(){
    this.$store.dispatch("getUserData")
    // this.isUsernameOk("medo007")

    setTimeout(() => this.loadActive = false, 1600)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;900&display=swap');
@import '@/assets/scss/_variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: $bg;
  color: $fontColor;
  overflow: hidden;
  main{
    margin: 0 auto;
    max-width: 1000px;
  }
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
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
  padding: 1.5rem 1rem ;
}
button, img{
  cursor: pointer
}

// animation
// fade-in
.fade-in-enter-active,
.fade-in-leave-active {
transition: opacity .3s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
opacity: 0;
}





</style>
