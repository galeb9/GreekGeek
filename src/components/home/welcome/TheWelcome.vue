<template>
    <div class="welcome-container">
      <div class="welcome__item">
        <div class="img-container">
          <img class="welcome__img" src="@/assets/img/greek-geek.png" alt="">
          <div :class="['dot', { 'online' : isLoggedIn }]"></div>
        </div>
        <WelcomeGreet />
        <!--<KillStreak />-->
      </div> 
    </div>
</template>

<script>
import WelcomeGreet from '@/components/home/welcome/WelcomeGreet'
//import KillStreak from '@/components/home/welcome/KillStreak'
import { auth } from '@/components/firebaseInit.js'

export default {
  name: 'TheHome',
  components:{
    WelcomeGreet,
    //KillStreak,
  },
  data(){
    return{
      isLoggedIn: false
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
@import '@/assets/scss/_variables.scss';
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
          //animation: breathe 1s infinite alternate ease-in-out;
        }
      }
    }
  }
  @keyframes breathe {
    from{
      transform: scale(0.9) rotate(45deg);
    }
    to{
      transform: scale(1) rotate(45deg);
    }
  }
</style>