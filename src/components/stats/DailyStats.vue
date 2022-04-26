<template>
  <BaseContainer>
    <div class="stats daily">
      <p class="stats__date">{{ `${today.getDate()} / ${today.getMonth() + 1}  / ${today.getFullYear()}` }}</p>
      <RoundStats
        :amount="userPushups"
        :goal="userGoal"
        :surplus="surplus"
       />

      <div class="stats-row">
        <div class="stats__calories">
            <img src="@/assets/icons/fire.svg" alt="">
            <div class="stats__info">
              <p >{{ calories }}</p>
              <h4>kcal Burnt</h4>
            </div>
        </div>
        <div class="stats-row-col">
          <div class="stats__pushups">
            <img src="@/assets/icons/Strong.svg" alt="">
            <div class="stats__info">
              <h4>Pushups</h4>
              <p >{{ userPushups }}</p>
            </div>
          </div>
            <div class="stats-attempts">
              <img src="@/assets/icons/attempts-icon.svg" alt="">
              <div class="stats__info">
                <h4>Attempts</h4>
                <p >{{ attempts }}</p>
              </div>
            </div>
        </div>
      </div>

      <div class="stats-item">
        <button @click="resetToday()" class="stats-item__button">Finish for today</button>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import { db, auth, firebase } from '@/components/firebaseInit.js'
import RoundStats from '@/components/stats//RoundStats.vue'

export default {
  components: {
    RoundStats
  },
  data(){
    return{
      daysChar: ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"],
      pushupsList: [],
      today: new Date(),
      currentAmount: 0,
      currentGoal: 100,

      userGoal: null,
      userPushups: null,
      userId: auth.currentUser.uid,

      surplus: 0,
      rate: 0, 
      attempts: 0, // will have to add a counter of inputs into add pushups comp.
      calories: 0,
    }
  },
  methods: {
    // make calories & attempts work
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

    
    //new user firebase code
    getUserData(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        this.userPushups = user.data().pushupsToday // users pushups today
        this.userGoal = user.data().goal // users pushups today
      })
    },
    saveUserDay(){
      const day = {
        dateNum: this.today.getDate(),
        day: this.getChar(this.today.getDay()),
        num: this.userPushups,
        status: this.isTodayWin()
      }

      db.collection("users").doc(this.userId).update({ // had to use firebase import to user .firestore.FieldValue.arrayUnion('some value')
        days : firebase.firestore.FieldValue.arrayUnion(day)
      })
    },
    resetTodaysPushups(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        user.ref.update({
          pushupsToday: 0
        })
      })
    },
    resetToday(){
      this.saveUserDay();
      this.resetTodaysPushups();
      this.userPushups = 0; 
      this.attempts = 0;
      this.calories = 0;
    }
  },
  created(){
    // this.getPushupsFB();
    this.getUserData();
    setTimeout(this.getBurntCalories, 300)

    // this.saveUserDay();
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
  .stats-row{
    width: 100%;
    max-width: 350px;
    display: flex;
    justify-content: space-around;
    gap: 20px;
    .stats__calories,
    .stats__pushups,
    .stats-attempts{
      color: black;
      font-weight: 900;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 1rem 0;
      padding: 1rem;
      border: 2px solid $secondary;
      img{
        width: 2rem;
      }
    }
    .stats__calories{
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      p{
        margin-bottom: .3rem;
      }
    }
  }
  .stats__date{
    color: black;
    font-weight: 900;
    letter-spacing: 5px;
  }
  .stats-item{
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