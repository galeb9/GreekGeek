<template>
  <div class="home__head">
    <h2>Greek Geek</h2>
    <div class="home__head__icons">
      <BaseIconLink 
        :icon="['fa', 'gear']" 
        url="settings"
        size="lg"
        class="icon-link"
      />
    </div>
  </div>
</template>

<script>
import { auth } from '@/components/firebaseInit.js'

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
@import '@/assets/scss/_variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

  .home__head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid $secondary;
    // padding-bottom: .3rem;
    .icon-link:last-child{
      margin-left: 2rem;
    }
    h2{
      letter-spacing: 2px;
      font-weight: 400;
      font-size: 30px;
      color: #161515e7;
      font-family: 'Staatliches', cursive;
    }
    .fa-icon{
      transform: scale(1.8);
      padding-right: 0.4rem;
      color: rgba( $secondary, 0.6 );
      // padding-bottom: .3rem;
      transition: all .3s ease-in ;
      &:hover{
        opacity: 1;
      }
    }
  }
</style>