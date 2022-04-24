<template>
  <main>
    <BaseBg />
    <router-view class="router-view" v-slot="{ Component }">
      <transition name="fade-in" mode="out-in">
        <!-- <component :is="logComponent(Component, Component.type.name)" /> -->
        <component :is="Component" />

      </transition>
    </router-view>
    <!-- <TheHeader v-if="headerVisible" class="header" /> -->
    <TheHeader v-if="false" class="header" />

  </main>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue'
import BaseBg from '@/components/UI/BaseBg'

export default {
  name: 'App',
  components: { 
    TheHeader,
    BaseBg
  },
  data(){
    return{
      headerVisible: true
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
    }
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
  background: transparent url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0;

  background: linear-gradient(151deg, rgb(231, 231, 231) 0%, rgba(255,255,255,1) 50%, rgba(147,189,164,1) 100%);
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
  padding: 2rem 1rem ;
}
button, img{
  cursor: pointer
}

// animation
// fade-in
.fade-in-enter-active,
.fade-in-leave-active {
transition: opacity 0.5s ease;
}
.fade-in-enter-from,
.fade-in-leave-to {
opacity: 0;
}





</style>
