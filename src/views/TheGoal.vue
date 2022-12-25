<template>
    <div class="goal">
      <form 
          @submit.prevent="changeUserGoal"
          class="goal__form"
      >
        <BaseInput 
          v-model="goal"
          placeholder="Goal goes here" 
          class="goal__input"
          type="number"
        />
        <BaseButton 
          text="Change goal"
          kind="auth"
          width="80%"
        />
      </form>
      <BaseNotif 
        :text="message"
        :type="type"
        :notif-visible="notifVisible"
      />
    </div>
</template>

<script>
import { db, auth } from '@/scripts/firebaseInit.js';

export default {
  components: {
  },
  data(){
    return{
      goal: null,
      userId: auth.currentUser.uid,

      message: '',  
      successMessage: `Goal changed to ${this.goal}`,
      warningMessage: 'Please type in your goal...',
      type: '',
      notifVisible: false,
    }
  },
  methods:{
    useNotification(message, type){
      this.notifVisible = true
      this.message = message
      this.type = type
      setTimeout(() => {
          this.notifVisible = false
      },3000)
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
        this.useNotification(this.successMessage, "success")
        this.goal = null;
      } else{
        this.useNotification(this.warningMessage, "warning")
      }
    }
  },
}
</script>

<style lang="scss">


.goal{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .goal__form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin: 50px 0;
    .goal__input{
      width: max-content;
      background: transparent;
      text-align:center;
      padding: 1rem 1.5rem;
      font-size: 20px;
      border-radius: 20px;
      outline: none;
      border: none;
      border: 3px solid $secondary;
    }
    .goal__button{
      background: transparent;
      border: 8px $secondary double;
      font-size: 20px;
      text-transform: uppercase;
      font-weight: 700;
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