<template>
  <BaseContainer>
    <div class="stats daily">
      <p class="stats__date">{{ `${today.getDate()} / ${today.getMonth() + 1}  / ${today.getFullYear()}` }}</p>
      <RoundStats
        :amount="userPushups"
        :goal="userGoal"
        :surplus="surplus"
       />

      <div class="stats-item">
        <button @click="togglePopup" class="stats-item__button">Finish day</button>
      </div>
      
      <DailyStatsItems 
        :attempts="attempts"
        :calories="calories"
        :userPushups="userPushups"
      />

 

      <transition name="move-in-bottom">
        <div class="popup-container" v-if="popupVisible">
          <div class="popup" >
            <h2>Finish for</h2>
            <BaseButton text="Today" @click="resetToday(this.getTodaysDate())" />
            <p>or</p>
            <BaseButton text="Yesterday" @click="resetToday(this.getYesterdayDate())" />
          </div>
        </div>
      </transition>
      <div 
        class="popup-bg"
        v-if="popupVisible"
        @click="togglePopup"
      >
      </div>

    </div>
  </BaseContainer>
</template>

<script>
// import { db, auth, firebase } from '@/components/firebaseInit.js'

import { db, auth } from '@/components/firebaseInit.js'
import RoundStats from '@/components/stats/RoundStats.vue'
import DailyStatsItems from '@/components/stats/DailyStatsItems.vue'

export default {
  components: {
    RoundStats,
    DailyStatsItems
  },
  data(){
    return{
      daysChar: ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"],
      today: new Date(),

      userGoal: 0,
      userPushups: 0,
      userId: auth.currentUser.uid,

      surplus: 0,
      rate: 0, 
      attempts: 0, // will have to add a counter of inputs into add pushups comp.
      calories: 0,

      popupVisible: false
    }
  },
  methods: {
    //attempts work
    togglePopup(){
      this.popupVisible = !this.popupVisible
    },
    getChar(num){
      return this.daysChar[num]
    },
    isTodayWin(){
      if(this.userPushups >= this.userGoal){
        return 'pos'
      }else{
        return 'neg'
      }
    },
    getBurntCalories(){
      this.calories = Math.ceil(this.userPushups * 0.45)
      console.log(this.calories)
    },
    getTodaysDate(){
      return `${this.today.getDate()}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
    },
    getYesterdayDate(){
      return `${this.today.getDate() - 1}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
    },
    //new user firebase code
    getUserData(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        this.userPushups = user.data().pushupsToday // users pushups today
        this.userGoal = user.data().goal // users pushups today
      })
    },
    // saveUserDay(){ // not used, maybe later 
    //   const day = {
    //     dateNum: this.today.getDate(),
    //     day: this.getChar(this.today.getDay()),
    //     num: this.userPushups,
    //     status: this.isTodayWin()
    //   }

    //   db.collection("users").doc(this.userId).update({ // had to use firebase import to user .firestore.FieldValue.arrayUnion('some value')
    //     days : firebase.firestore.FieldValue.arrayUnion(day)
    //   })
    // },
    resetTodaysPushups(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        user.ref.update({
          pushupsToday: 0
        })
      })
    },

    saveUserDayz(day){
      db.collection("users").doc(this.userId)
        .collection("dayz")
        .doc(day)
        .set({
          dateNum: this.today.getDate(),
          day: this.getChar(this.today.getDay()),
          num: this.userPushups,
          status: this.isTodayWin()
        })
    },

    resetToday(day){
      // this.saveUserDay();
      this.saveUserDayz(day);
      this.resetTodaysPushups();
      this.userPushups = 0; 
      this.attempts = 0;
      this.calories = 0;
      this.popupVisible = false
    }

  },
  created(){
    this.getUserData();
    setTimeout(this.getBurntCalories, 300)
    console.log(this.getYesterdayDate())
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.stats{
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5rem;

  .stats__date{
    color: black;
    font-weight: 900;
    letter-spacing: 5px;
  }
  .stats-item{
    position: relative;

    &__button{
      padding: 1.5rem 3rem;
      background: none;
      border: 5px double $secondary;
      color: black;
      outline: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 900;
      margin-top: 1rem;
      transition: all .3s ease-in-out;
      &:hover{
        background: $black;
        color: white;
      }
    }
  }
  .popup-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    position: absolute;
    z-index: 100;
    bottom: 30vh;
    height: 50vh;
    left: 10%;
    right: 10%;
    border: 10px double $secondary;
    backdrop-filter: blur(8px);
    text-align: center;
    .popup{
      h2{
        margin-bottom: 1rem;
        font-weight: 900;
      }
      p{
        margin: 1rem 0;
        font-weight: 900;
      }
    }
  }
  .popup-bg{
    position: absolute;
    top: -150px;
    width: 100vw;
    height: 120vh;
    z-index: 2;
    opacity: 0.3;
    background: repeating-linear-gradient( 45deg, $secondary, black 2px, $bg 2px, $bg 10px );
  }
}
@media only screen and (max-width: 340px) {
  .stats-row{
    .stats__info h4{
      display: none;
    }
    .stats__calories{
      flex-grow: 1;
    }
  }
}
</style>