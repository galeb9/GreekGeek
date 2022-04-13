<template>
    <div class="welcome-container">
      <div class="welcome__item">
        <img class="welcome__img" src="@/assets/img/greek-geek.png" alt="">
        <WelcomeGreet />
        <!--<KillStreak />-->
      </div> 
    </div>
</template>

<script>
import WelcomeGreet from '@/components/home/welcome/WelcomeGreet'
//import KillStreak from '@/components/home/welcome/KillStreak'
export default {
    name: 'TheHome',
    components:{
      WelcomeGreet,
      //KillStreak,
    }

}
</script>

<style lang="scss">
 .welcome-container{
    // display: flex;
    margin-top: 2rem;

    .welcome__item{
      display: flex;
      align-items: center;
      gap: 1.5rem;
      .welcome__img{
        max-width: 100%;
        width: 10rem;
        border-radius: 50%;
      }
    }

  }
</style>