<template>
  <div class="settings">
    <div class="settings__back" @click="goHome" >
      <font-awesome-icon class="fa-settings" :icon="['fa', 'angle-down']"/>
      <h3>Home</h3>
    </div>
    <div class="container">
      <div class="settings__items">
        <SettingsItem
          title="Main Info"
          :dropItem="'User: ' + username + '\nEmail: ' + email"
        />
            
        <div class="logout settings__item" @click="logout">
          <div class="settings__item__info">
            <h3>Logout</h3>
            <div class="fa-container">
              <font-awesome-icon class="fa-settings" :icon="['fa', 'right-from-bracket']"/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { auth, db } from '@/components/firebaseInit.js';
import SettingsItem from '@/components/settings/SettingsItem.vue'


export default {
  components: {
    SettingsItem
  },
  data(){
    return{
      email: null,
      username: null
    }
  },
  methods: {
    logout(){
      auth.signOut().then(() => {
        // this.$router.push('/login');
        this.$router.go({path : this.$router.path});
      })
    },
    goHome(){
      this.$router.push("/")
    },
    getUsername(){
      db.collection("users").doc(auth.currentUser.uid).get()
        .then(user => {
          this.username = user.data().username;
        })
    }
  },
  created(){
    this.email = auth.currentUser.email
    this.getUsername();
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

  .settings{
    color: black;
    min-height: 70vh;
    .settings__back{
      display: flex;
      align-items: center;
      padding-left: 1rem;
      gap: 1rem;
      .fa-settings{
        transform: rotate(90deg);
      }
    }
    .container{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
  }
</style>