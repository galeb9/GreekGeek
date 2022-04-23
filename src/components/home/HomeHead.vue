<template>
  <div class="home__head">
    <BaseDate />
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
import BaseDate from '@/components/UI/BaseDate.vue'
import { auth } from '@/components/firebaseInit.js'

export default {
  components: {
    BaseDate
  },
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
  .home__head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-link:last-child{
      margin-left: 2rem;
    }
    h2{
      letter-spacing: 1px;
      font-weight: 400;
    }
    .fa-icon{
      transform: scale(1.8);
      padding-right: 0.4rem;
      color: rgba( $secondary, 0.6 );
      
      transition: all .3s ease-in ;
      &:hover{
        opacity: 1;
      }
    }
  }
</style>