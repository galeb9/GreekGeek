<template>
  <div class="home-profile">
    <HomeSection title="my profile">
        <div class="home-profile__icon" @click="goToProfilePage">
            <font-awesome-icon class="fa-user" :icon="['fa', 'user']"/>
        </div>
    </HomeSection>
  </div>
</template>

<script>
export default {
    methods: {
        goToProfilePage(){
            this.$router.push("/profile")
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .home-profile{
        width: 100%;
        .home-profile__icon{
            margin: 0 auto;
            width: 100px;
            padding-bottom: 1rem;
            .fa-user{
                margin: 0 auto;
                width: 100px;
                font-size: 3rem;
                color: $secondary;
            }
        }

    }
</style>