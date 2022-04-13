<template>
    <div class="goal">
      <form 
          @submit.prevent="editNewGoal"
          class="goal__form"
      >
        <BaseInput 
          v-model="goal"
          placeholder="Today's goal goes here" 
          class="goal__input"
        />
        <BaseButton 
        class="goal__button"
          text="ADD"
          type="submit"
        />
      </form>
    </div>
</template>

<script>
import { db } from '@/components/firebaseInit.js';

export default {
  data(){
    return{
      goal: null,
    }
  },
  methods:{
    async editNewGoal(){
      let newGoal = this.goal;
      if(this.goalAmount !== null && this.goalAmount !== '' ){
        db.collection("goal").get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({
              goalPushups: Number(newGoal)
            })
          })
        })
        this.goal = ''
      }else{
        console.log("You need to enter something")
      }
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.goal{
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .goal__form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px 0;
    .goal__input{
      width: max-content;
      text-align:center;
      padding: 1rem 1.5rem;
      font-size: 20px;
      border-radius: 20px;
      outline: none;
      border: none;
      border: 3px dashed $secondary;
    }
    .goal__button{
      background: transparent;
      border: 8px $secondary double;
      font-size: 25px;
      padding: 1.5rem 2.5rem;
      margin-top: 4rem;
      color: black;
      letter-spacing: 2px;
      transition: all .3s ease-in-out;
      &:hover{
          background: $black;
          color: white;
      }
    }
  }
}

</style>