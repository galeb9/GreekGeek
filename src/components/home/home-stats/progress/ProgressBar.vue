<template>
    <div class="progress">
        <!-- <progress class="progress-bar" id="file" :value="rate" max="100"></progress> -->
        <div class="progress-bar">
              <div class="progress-state" :style="{'width' :  rate + '%'}"></div>
        </div>
        <p>{{ rate }} %</p>
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
      rate: 72, 
    }
  },
  methods: {
    successRate(){
      this.getGoal();
      this.getAmount();
      this.rate =  Math.floor((this.currentAmount / this.currentGoal) * 100)
      //console.log(this.currentAmount)
      return this.rate 
    },
    getGoal(){ 
      db.collection('goal').get().then(snapshot => {
        snapshot.forEach(doc => {
          this.currentGoal = doc.data().goalPushups
        })
      })
      //console.log("goal: " + this.currentGoal)
    },
    getAmount(){
      db.collection('donePushups').get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data())
          this.list.push(doc.data().newPushups)
        })
      });
      //console.log(this.list)
    }
  },
  created(){
    
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
        align-items: center;
        .progress-bar{
            // width: 60%;
            width: 140px;
            height: 10px;
            background: rgba($grey, 0.3);
            border-radius: 30px;
            .progress-state{
                width: 0;
                border-radius: 30px;
                height: 100%;
                background: white;
            }
        }
    }
</style>