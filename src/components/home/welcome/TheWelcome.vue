<template>
    <div class="welcome-container">
      <!-- <div class="welcome__item">
        <WelcomeGreet />
        <KillStreak />
      </div> -->
      <div class="welcome__item">
      </div>
    </div>
</template>

<script>
//import WelcomeGreet from '@/components/home/welcome/WelcomeGreet'
//import KillStreak from '@/components/home/welcome/KillStreak'
export default {
    name: 'TheHome',
    components:{
  //      WelcomeGreet,
  //      KillStreak,
    }

}
</script>

<style lang="scss">
 .welcome-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>