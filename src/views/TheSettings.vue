<template>
  <div class="settings">
    <GoBack 
      text="Back" 
      type="dark"  
      :absolute="false"
      @click="goHome"   
    />
    <div class="settings__items">
      <BaseDropdown title="Main info">
        <div class="main-info__container">
          <div class="main-info__row">
            <p class="main-info__row-item">Username</p>
            <p class="main-info__row-item"><strong>{{ username }}</strong></p>
          </div>
          <div class="main-info__row">
            <p class="main-info__row-item">Email</p>
            <p class="main-info__row-item"><strong>{{ email }}</strong></p>
          </div>
        </div>
      </BaseDropdown>
      <BaseDropdown title="Logout">
        <div class="logout__container" @click="logout">
          <p>Would you like to log out?</p>
          <font-awesome-icon class="fa-settings" :icon="['fa', 'right-from-bracket']"/>
        </div>
      </BaseDropdown>



      <BaseDropdown title="Choose color">
        <div class="color__container">
          <div class="color__type">
            <label for="bg">Background</label>
            <input type="color" id="bg" name="bg" :value="bg">
          </div>
          <div class="color__type">
            <label for="complementary">Complementary</label>
            <input class="" type="color" id="complementary" name="complementary" :value="complementary">
          </div>
        </div>
      </BaseDropdown>
      <!-- <p>bg: {{ bg }}</p>
      <p>comp: {{complementary}}</p> -->

    </div>
  </div>
</template>

<script>
import { auth, db } from '@/components/firebaseInit.js';
import BaseDropdown from '@/components/UI/BaseDropdown.vue'

export default {
  components: {
    BaseDropdown
  },
  data(){
    return{
      email: null,
      username: null,
      bg: "#E6EEFA",
      complementary: "black"
    }
  },
  methods: {
    logout(){
      auth.signOut().then(() => {
        this.$router.go({path : this.$router.path});
      })
    },
    goHome(){
      this.$router.push("/")
    },
    getUsername(){
      db.collection("users").doc(auth.currentUser.uid).get().then(user => this.username = user.data().username)
    }
  },
  created(){
    this.email = auth.currentUser.email
    this.getUsername();
  }
}
</script>

<style lang="scss">

  .settings{
    color: black;
    min-height: 70vh;
    .settings__items {
      display: flex;
      flex-direction: column;
      gap: 28px;
      margin-top: 50px;
      .logout__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fa-settings {
          cursor: pointer;
        }
      }
      .main-info__container {
        .main-info__row {
          display: flex;
          justify-content: space-between;
        }
      }
      .color__container {
        display: flex;
        flex-direction: column;
        gap: 6px;
        .color__type {
          display: flex;
          align-items: center;
          justify-content: space-between;
          input[type="color" i] {
            appearance: auto;
            width: 90px;
            height: 40px;
            cursor: pointer;
            background-color: transparent;
            color: transparent;
            border: none;
            border-radius: 8px;
          }
        }
      } 
    }
  }
</style>