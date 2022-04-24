<template>
    <div class="goal">
      <form 
          @submit.prevent="changeUserGoal"
          class="goal__form"
      >
        <BaseInput 
          v-model="goal"
          placeholder="Today's goal goes here" 
          class="goal__input"
          type="number"
        />
        <BaseButton 
        class="goal__button"
          text="ADD"
          type="submit"
        />
      </form>
      <TheHeader />
    </div>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js';
import TheHeader from '@/components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  data(){
    return{
      goal: null,
      userId: auth.currentUser.uid
    }
  },
  methods:{
    // async editNewGoal(){ // old code
    //   let newGoal = this.goal;
    //   if(this.goalAmount !== null && this.goalAmount !== '' ){
    //     db.collection("goal").get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc => {
    //         doc.ref.update({
    //           goalPushups: Number(newGoal)
    //         })
    //       })
    //     })
    //     this.goal = ''
    //   }else{
    //     console.log("You need to enter something")
    //   }
    // },

    getUserData(){
      db.collection("users").doc(this.userId).get()
      .then(user => {
        console.log(user.data())
      })
    },

    changeUserGoal(){
      let g = Number(this.goal)
      if(g !== null && g !== '' && g > 0 ){
        db.collection("users").doc(this.userId).get()
        .then(user => {
          user.ref.update({
            goal: g
          })
        })
        this.goal = null;
      } else{
        console.log("Enter you goal dumb dumb...")
      }
    }
  },
  created(){
    this.getUserData();
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