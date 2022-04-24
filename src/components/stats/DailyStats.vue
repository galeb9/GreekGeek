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
        <button @click="deletePushups()" class="stats-item__button">Finish for today</button>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'
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
  watch: {
    currentAmount(){ // updates current pushups // NOT NEEDED 
      db.collection("currentPushups").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.update({
            current: Number(this.currentAmount)
          })
        })
      })
    },
  },
  methods: {
    saveDayStats(){
      const currentDay = {
        dateNum: this.today.getDate(),
        day: this.getChar(this.today.getDay()),
        num: this.currentAmount,
        status: this.isTodayWin()
      }
      db.collection("days").add(currentDay)
      //console.log(currentDay)
    },
    deletePushups(){
      this.saveDayStats();
      db.collection('donePushups').get().then(snapshot =>{
        snapshot.forEach(doc => {
          doc.ref.delete()
        })
      })

      this.currentAmount = 0;
      this.attempts = 0;
      this.calories = 0;
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
    successRate(){ // NOT NEEDED
      this.rate =  Math.floor((Number(this.userPushups) / Number(this.userGoal)) * 100)  
      return this.rate + "%"
    },
    getBurntCalories(){
      this.calories = Math.ceil(this.currentAmount * 0.45)
    },
 
    currentPushupsMade(){ // get currentAmount, attempts, burntCalories
    // NOT NEEDED
      this.currentAmount = this.pushupsList 
        .map(item => item.newPushups)
        .reduce((sum, num) => sum += Number(num), 0);

      this.getBurntCalories();
      this.getGoal();
      this.surplus = this.currentAmount - this.currentGoal
      this.attempts = this.pushupsList.length;
    },


    getPushupsFB(){
    // NOT NEEDED
      db.collection('donePushups').get().then(snapshot => {
        snapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'newPushups': Number(doc.data().newPushups)
          }
          this.pushupsList.push(data)
        })
        this.currentPushupsMade();
      })
    },

    getGoal(){
    // NOT NEEDED
      db.collection('goal').get().then(snapshot => {
        snapshot.forEach(doc => {
          this.currentGoal = doc.data().goalPushups
        })
      })
    },

    //new user firebase code
    getUserData(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        console.log(user.data())
          this.userPushups = user.data().pushupsToday // users pushups today
          this.userGoal = user.data().goal // users pushups today
          // console.log('P: ' + this.userPushups)
          // console.log('G: ' + this.userGoal)
      })
    },
    saveUserDay(){
      const day = {
        dateNum: this.today.getDate(),
        day: this.getChar(this.today.getDay()),
        num: this.userPushups,
        status: this.isTodayWin()
      }

      console.log(day) // ????? how to update an array with an object
      db.collection("users").doc(this.userId).get()
      .then(user => {
        console.log('Day: ' + user.data().days)
        // user.ref.update({
        //   days:  user.data().days[0] = day
        // })
      })
    }


  },
  created(){
    this.getPushupsFB();

    this.getUserData();
    this.saveUserDay();
  }
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