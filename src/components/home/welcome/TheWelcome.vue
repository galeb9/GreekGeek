<template>
    <div class="welcome-container">
      <div class="welcome__item">
        <div class="img-container">
          <img 
            class="welcome__img" 
            :src="getImgUrl(avatarImg)" 
            alt="avatar-img"
          >
          <div :class="['dot', { 'online' : isLoggedIn }]"></div>
        </div>
        <WelcomeGreet />
      </div> 
    </div>
</template>

<script>
import WelcomeGreet from '@/components/home/welcome/WelcomeGreet'
import { auth } from '@/components/firebaseInit.js'

export default {
  name: 'TheHome',
  components:{
    WelcomeGreet,
  },
  data(){
    return{
      isLoggedIn: false,
    }
  },
  computed: {
    avatarImg(){
      return this.$store.getters.myAvatar;
    }
  },
  methods: {
    getImgUrl(pic) {
      return require('@/assets/img/avatars/' + pic)
    }
  },
  created(){
    if(auth.currentUser) {
      this.isLoggedIn = true;
    }
    
  }
}
</script>

<style lang="scss">

 .welcome-container{
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 8px double $grey;
    .welcome__item{
      display: flex;
      gap: 1.5rem;
      .img-container{
        position: relative;
        .welcome__img{
          max-width: 100%;
          width: 6rem;
          //border-radius: 50%;
          border-radius: 5px;
        }
        .dot{
          width: 15px;
          height: 15px;
          position: absolute;
          bottom: 3px;
          right: -3px;
          //border-radius: 50%;
          transform: rotate(45deg);
        }
        .online{
          background: rgb(48, 199, 43);
          animation: rotate 10s infinite alternate ease-in-out;

        }
      }
    }
  }

  @keyframes rotate {
    from{
      transform: rotate(45deg);
    }
    to{
      transform: rotate(410deg);
    }
  }
</style>