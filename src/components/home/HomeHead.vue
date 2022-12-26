<template>
  <div class="home__head">
    <h2 class="home__head__title">Greek Geek</h2>
    <div class="home__head__icons">
      <BaseIcon 
        aligment="top-right"
        icon="settings"
        @click="$router.push('/settings')"
      />
    </div>
  </div>
</template>

<script>
import { auth } from '@/scripts/firebaseInit.js'

export default {
  data(){
    return{
      isLoggedIn: false,
      currentUser: false
    }
  },
  methods: {
    logout(){
      auth.signOut().then(() => {
        // this.$router.push('/login');
        this.$router.go({path : this.$router.path});
      })
    }
  },
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

  .home__head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .home__head__title{
      letter-spacing: 2px;
      font-weight: 400;
      font-size: 30px;
      font-family: 'Staatliches', cursive;
    }
  }
</style>