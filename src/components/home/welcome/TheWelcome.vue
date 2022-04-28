<template>
    <div class="welcome-container">
      <div class="welcome__item">
        <div class="img-container">

          <img else
            class="welcome__img" 
            :src="getImgUrl(userImg)" 
            alt=""
          >

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
import { db, auth } from '@/components/firebaseInit.js'

export default {
  name: 'TheHome',
  components:{
    WelcomeGreet,
    //KillStreak,
  },
  data(){
    return{
      isLoggedIn: false,
      userImg: "greek-geek.png"
    }
  },
  methods: {
    getUserImg(){
      db.collection("users").doc(auth.currentUser.uid).get()
      .then(user => {
          this.userImg = user.data().userImg
      })
    },
    getImgUrl(pic) {
      return require('@/assets/img/avatars/' + pic)
    }
  },
  created(){
    if(auth.currentUser) {
      this.isLoggedIn = true;
    }

    this.getUserImg()

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