<template>
  <div class="settings">
    <div class="container">
      <!--<WorkInProgress />-->
      <div class="settings__items">
        <SettingsItem
          title="Main Info"
          :dropItem="'Logged in as: ' + email"
        />

        <SettingsItem 
          title="Logout"
        >
          <BaseIconLink 
            :icon="['fa', 'right-from-bracket']" 
            url="login"
            size="lg"
            class="icon-link"
            @click="logout"
          />
        </SettingsItem>
        <SettingsItem
          title="Go Home"
          :dropItem="'Logged in as: ' + email"
          @click="goHome"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/components/firebaseInit.js';
import SettingsItem from '@/components/settings/SettingsItem.vue'


export default {
  components: {
    SettingsItem
  },
  data(){
    return{
      email: null
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
    }
  },
  created(){
    this.email = auth.currentUser.email
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

  .settings{
    //justify-content: center;
    //align-items: center;
    color: black;
    min-height: 70vh;
    .container{
      padding-top: 3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>