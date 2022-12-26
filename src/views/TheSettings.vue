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
      <BaseDropdown title="Change color">
        <div class="color__container">
          <div class="color__type">
            <label for="bg">Background</label>
            <input type="color" id="bg" name="bg" v-model="bg">
          </div>
          <div class="color__type">
            <label for="complementary">Complementary</label>
            <input class="" type="color" id="complementary" name="complementary" v-model="complementary">
          </div>
          <div class="color__actions">
            <BaseButton text="Reset" @click="resetTheme" width="100%" :shadow="false"/>
            <BaseButton text="Save" @click="saveTheme" width="100%" :shadow="false"/>
          </div>
        </div>
      </BaseDropdown>
      <BaseDropdown title="Logout">
        <div class="logout__container" @click="logout">
          <p>Would you like to log out?</p>
          <font-awesome-icon class="fa-settings" :icon="['fa', 'right-from-bracket']"/>
        </div>
      </BaseDropdown>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/scripts/firebaseInit.js';
import BaseDropdown from '@/components/UI/BaseDropdown.vue'

export default {
  components: {
    BaseDropdown
  },
  data(){
    return{
      email: null,
      username: null,
      bg: null,
      complementary: null,
    }
  },
  // ideas: 
  // reset colors btn (reset local storage)
  watch: {
    bg () {
      const app = document.querySelector("#app").style;
      app.setProperty("--background", this.bg)
      app.setProperty("--color", this.invertTextColor(this.bg, "white", "black"))
      // app.setProperty("--shadowSmall", this.invertTextColor(this.bg, "rgba(99, 99, 99, 0.39) 0px 2px 8px 0px", "rgba(255, 255, 255, 0.39) 0px 2px 8px 0px"))
    },
    complementary () {
      const app = document.querySelector("#app").style;
      app.setProperty("--complementary", this.complementary)
      app.setProperty("--oppositeColor", this.invertTextColor(this.complementary, "black", "white"))
    }
  },
  created(){
    this.email = auth.currentUser.email
    this.getUsername();
    this.bg = localStorage.getItem("bg") || "#E6EEFA"
    this.complementary = localStorage.getItem("complementary") || "#000000"
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
    },
    invertTextColor(bgColor, lightColor, darkColor, changeBorder = 186) {
      const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > changeBorder) ? darkColor : lightColor;
    },
    saveTheme () {
      localStorage.setItem('bg', this.bg);
      localStorage.setItem('complementary', this.complementary);
    },
    resetTheme () {
      localStorage.removeItem('bg');
      localStorage.removeItem('complementary');
      this.bg = "#E6EEFA"
      this.complementary = "#000000"
      const app = document.querySelector("#app").style;
      app.setProperty("--background", this.bg)
      app.setProperty("--color", this.invertTextColor(this.bg, "white", "black"))
      app.setProperty("--complementary", this.complementary)
    }
  }
}
</script>

<style lang="scss">
  .settings{
    // color: #000000;
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
        .color__actions {
          padding-top: 20px;
          display: flex;
          justify-content: space-around;
          gap: 16px;
          .base-button {
            width: 100%;
          }
        }
      } 
    }
  }
</style>