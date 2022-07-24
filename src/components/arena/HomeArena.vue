<template>
  <HomeSection title="Arenas">
    <div class="home-arenas">
      <BaseButton 
        v-if="myFriendsCount > 0" 
        @click="$router.push('/arena')" 
        text="See your Arenas" 
      />
      <div v-else class="home-arenas__no-arenas">
        <BaseButton 
          @btn-click="$router.push('/friends')" 
          text="Make Friends" 
          kind="icons"
          width="80%"
          align="center"
          icon-type="loupe"
        />
        <p class="no-arenas__message">Make Friends to use arenas!</p>
      </div>
  
    </div>
  </HomeSection>
</template>

<script>
export default {
  computed: {
    myFriendsCount() {
      return this.$store.getters.myFriendsCount
    }
  }
}
</script>

<style lang="scss">
  .home-arenas{
    padding-bottom: 2rem;
    .home-arenas__no-arenas {

      .no-arenas__message {
        margin-top: 1.5rem;
        text-align: center;
      }
    }
  }
</style>