<template>
    <div class="welcome__greet">
        <h3>Hello {{ myUsername }} 🌿</h3>
        <h2>Welcome Back!</h2>
    </div>
</template>

<script>

export default {
    name: 'WelcomeGreet',
    computed: {
        myUsername(){
            return this.$store.getters.myUsername
        }
    },
}
</script>

<style lang="scss">
    .welcome__greet{
        margin-top: 1rem;
        h2{ margin: .2rem  0 }
    }
</style>