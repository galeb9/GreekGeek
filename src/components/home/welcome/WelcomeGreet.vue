<template>
    <div class="welcome__greet">
      <h4>Hello {{ username }} 👋</h4>
      <h3>Welcome Back!</h3>
    </div>
</template>

<script>
export default {
    name: 'TheHome',
    data(){
        return{
            username: "Matej"
        }
    }
}
</script>

<style lang="scss">
    .welcome__greet{
        h3{
            margin: .2rem 0 1.2rem 0;
        }
    }
</style>