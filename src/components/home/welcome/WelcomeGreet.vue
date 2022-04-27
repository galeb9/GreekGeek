<template>
    <div class="welcome__greet">
      <h3>Hello {{ username }} 🌿</h3>
      <h2>Welcome Back!</h2>
    </div>
</template>

<script>
import { auth, db } from '@/components/firebaseInit.js';

export default {
    name: 'TheHome',
    data(){
        return{
            username: "Matthaios"
        }
    },
    methods: {
        getUsername(){
            db.collection("users").doc(auth.currentUser.uid).get()
                .then(user => {
                this.username = user.data().username;
                })
        }
    },
    created(){
        this.getUsername();
    }
}
</script>

<style lang="scss">
    .welcome__greet{
        margin-top: 1rem;
        h2{
            margin: .2rem  0;
        }
    }
</style>