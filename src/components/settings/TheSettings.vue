<template>
  <div class="settings">
    <div class="container">
      <!--<WorkInProgress />-->
      
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