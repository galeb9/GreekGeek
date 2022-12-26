<template>
  <BaseContainer>
    <div class="stats__daily">
      <p class="stats__date">{{ `${today.getDate()} / ${today.getMonth() + 1}  / ${today.getFullYear()}` }}</p>
      <BaseProgress 
        :progress="progress"
        :count="count" 
        :circleSize="200"
      >
        <RoundStats
          :amount="userPushups"
          :goal="userGoal"
          :surplus="surplus"
          :size="180"
          :count="count"
        />
      </BaseProgress>

      <BaseButton text="Finish your day" margin="20" @btn-click="togglePopup" />

      <DailyStatsItems 
        :attempts="attempts"
        :calories="calories"
        :userPushups="userPushups"
      />

      <transition name="move-in-bottom">
        <div class="popup-container" v-if="popupVisible">
          <div class="popup" >
            <h2>Finish for</h2>
            <BaseButton text="Today" @click="resetToday(this.getTodaysDate(), month)" />
            <p>or</p>
            <BaseButton text="Yesterday" @click="resetYesterday(this.getYesterdayDate(), month)" />
          </div>
        </div>
      </transition>
      <div class="popup-bg" v-if="popupVisible" @click="togglePopup"></div>
    </div>
  </BaseContainer>
</template>

<script>
// import { db, auth, firebase } from '@/components/firebaseInit.js'

import { db, auth } from '@/scripts/firebaseInit.js'
import RoundStats from '../RoundStats.vue'
import DailyStatsItems from './DailyStatsItems.vue'

export default {
  components: {
    RoundStats,
    DailyStatsItems
  },
  data(){
    return{
      daysChar: ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"],
      today: new Date(),
      month: null,
      userGoal: 0,
      userPushups: 0,
      userId: auth.currentUser.uid,
      surplus: 0,
      rate: 0, 
      attempts: 0, // will have to add a counter of inputs into add pushups comp.
      calories: 0,
      popupVisible: false,
      count: 0,
      progressPercentage: 0,
      progress: 0
    }
  },
  watch: {
		userPushups () {
      // let interval1, interval2;
      this.progressPercentage = Math.floor(this.userPushups / this.userGoal * 100)
      this.countPushups(this.userPushups)
      this.countProgress(this.progressPercentage)
      // this.countNumber(interval1, this.count, this.userPushups)
      // this.countNumber(interval2, this.progress, this.progressPercentage)
		}
	},
  methods: {
    countProgress (end) {
			let counter = setInterval(() => this.progress < end ? this.progress++ :clearInterval(counter), Math.floor(1000 / end))
		},
    countPushups (end) {
			let counter = setInterval(() => this.count < end ? this.count++ :clearInterval(counter), Math.floor(1000 / end))
		},
    // countNumber(variable, start, max) {
		// 	variable = setInterval(() => start < max ? start++ :clearInterval(variable), Math.floor(1000 / max))
    // },
    togglePopup(){
      this.popupVisible = !this.popupVisible
    },
    getChar(num){
      if(num === -1) num = this.daysChar.length - 1
      return this.daysChar[num]
    },
    isTodayWin(){
      return this.userPushups >= this.userGoal ? 'pos':'neg'
    },
    getTodaysDate(){
      return `${this.today.getDate()}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
    },
    getYesterdayDate(){
      return `${this.today.getDate() - 1}-${this.today.getMonth() + 1}-${this.today.getFullYear()}`
    },
    getMonthByWord(month) {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      return months[month]
    },
    //new user firebase code
    getUserData(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        this.userPushups = user.data().pushupsToday
        this.userGoal = user.data().goal
        this.attempts = user.data().attempts
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
          pushupsToday: 0,
          attempts: 0
        })
      })
    },
    saveToday(day, month){
      db.collection("users").doc(this.userId)
        .collection("past")
        .doc(month)
        .collection("days")
        .doc(day)
        .set({
          dateNum: this.today.getDate(),
          day: this.getChar(this.today.getDay()),
          num: this.userPushups,
          status: this.isTodayWin(),
          attempts: this.attempts
        })
    },
    saveYesterday(day, month){
      db.collection("users").doc(this.userId)
        .collection("past")
        .doc(month)
        .collection("days")
        .doc(day)
        .set({
          dateNum: this.today.getDate() -1,
          day: this.getChar(this.today.getDay() -1),
          num: this.userPushups,
          status: this.isTodayWin(),
          attempts: this.attempts
        })
    },
    resetDay() {
      this.resetTodaysPushups();
      this.userPushups = 0
      this.attempts = 0
      this.calories = 0
      this.popupVisible = false
      this.count = 0
      this.progress = 0
    },
    resetToday(day, month){
      this.saveToday(day, month);
      this.resetDay()
    },
    resetYesterday(day, month){
      this.saveYesterday(day, month);
      this.resetDay()
    }
  },
  created(){
    this.getUserData();
    this.month = this.getMonthByWord(this.today.getMonth())
  },
}
</script>

<style lang="scss">

.stats__daily{
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5rem;
  gap: 20px;

  .stats__date{
    color: black;
    font-weight: 900;
    letter-spacing: 5px;
    margin-bottom: 20px;
  }
  .stats-item{
    position: relative;
    &__button{
      padding: 1.5rem 3rem;
      background: none;
      border: 5px double var(--complementary);
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
    border: 10px double var(--complementary);
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
    background: repeating-linear-gradient( 45deg, var(--complementary), black 2px, $bg 2px, $bg 10px );
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