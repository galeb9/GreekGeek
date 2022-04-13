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
@import '@/assets/scss/_variables.scss';
 .welcome-container{
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 8px double $grey;
    .welcome__item{
      display: flex;
      gap: 1.5rem;
      .welcome__img{
        max-width: 100%;
        width: 6rem;
        //border-radius: 50%;
        border-radius: 5px;
      }
    }

  }
</style>