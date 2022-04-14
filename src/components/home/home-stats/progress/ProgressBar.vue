<template>
    <div class="progress">
      <div class="bar-container">
        <div class="progress-bar">
          <div class="progress-state" :style="{'width' :  rate + '%'}"></div>
        </div>
        <p>{{ rate }} %</p>
      </div>
      <button class="progress__btn" @click="successRate()">Result</button>
    </div>
</template>


<script>
import { db } from '@/components/firebaseInit.js'

export default {
 data(){
    return{
      list: [],
      currentAmount: 0,
      currentGoal: 100,
      goal: 100,
      rate: 0, 
    }
  },
  methods: {
    successRate(){
      this.rate =  Math.floor((this.currentAmount / this.goal) * 100)
      if(this.rate > 100){
        return this.rate = 100 
      }
      return this.rate 
    },
    getGoal(){ 
      db.collection('goal').get().then(snapshot => {
        snapshot.forEach(doc => {
          this.goal = doc.data().goalPushups
        })
        console.log('current goal: ' + this.goal)
      })
    },
    getAmount(){
      db.collection('donePushups').get().then(snapshot => {
        snapshot.forEach(doc => {
          this.currentAmount += doc.data().newPushups
        })
        console.log('current amount: ' + this.currentAmount)
      });
      return this.currentAmount;
    },
  },
  beforeCreate(){

  },
  created(){
    this.getGoal();
    this.getAmount();
  },
  beforeMount(){
    this.successRate()
  }

}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.progress{
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  .bar-container{
    display: flex;
    align-items: center;
    flex: 1;
    .progress-bar{
      display: flex;
      max-width:70%;
      width: 160px;
      height: 10px;
      background: rgba($grey, 0.3);
      border-radius: 30px;
      margin-right: .5rem;
      .progress-state{
        width: 0;
        border-radius: 30px;
        height: 100%;
        background: black;
      }
    }
  }

  .progress__btn{
    padding: 0.5rem 1.5rem;
    border: 4px double $secondary;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 18px;
    text-transform: uppercase;
    color: rgba(black, 0.9);
  }
}
@media only screen and (max-width: 540px) {
  .progress{
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    .bar-container{
      flex-direction: column-reverse;
      gap: 1rem;
      .progress-bar{
        margin-right: 0;
        max-width: 400px;
      }
      p{
        transform: translateX(0.5rem);
      }
    }
  }
}
</style>