<template>
  <div class="login">
    <div class="login__container">

        <img class="auth-img" src="@/assets/img/greek-body.png" alt="">

        <div class="login__main">
            <div class="app-title">
                <h2>GreeK GeeK</h2> 
            </div>
            <form class="login-form">
                <div class="input-field">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email">
                </div>
                <div class="input-field">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password">
                </div>
                <button class="login__button" @click="register">REGISTER</button>
            </form>
        </div>
        <div class="or">
            <h4>OR</h4>
            <router-link to="/login">
                <h3>Already have an account</h3>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register(e){
            auth.createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    alert(`Račun narejen za ${user.email}`)
                    this.$router.go({path : this.$router.path});
                    return db.collection('users').doc(user.uid).set({
                        goal: 100,
                        days: [],
                        pushupsToday: 0 // does not work??
                    })
                },
                err => {
                    alert(err.message)
                }
            )
            e.preventDefault();
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.login{
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    color: $secondary;
    min-height: 120vh;
    .login__container{
        z-index: 1;

        min-height: 85vh;
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .auth-img{
            position: absolute;
            bottom: -10px;
            left: -30px;
            z-index: -1;
            opacity: 0.8;
        }
        .or{
            padding-top: .5rem;
            h3{
                text-align: center;
                color: white;
                background: $secondary;
                padding: 1rem 0;
                margin-bottom: 2rem;
                letter-spacing: 2px;
            }
            h4{
                text-align: center;
                margin-bottom: 1rem;
            }
        }
        .login__main{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .app-title{
                background: $secondary;
                color: white;
                padding: 1rem ;
                text-align: center;
            }
            .login-form{
                display: flex;
                flex-direction: column;
                height: 100%;
                .input-field{
                    display: flex;
                    flex-direction: column;
                    margin-top: 1rem;
                    label{
                        font-weight: 700;
                        font-size: 1.2rem;
                        letter-spacing: 2px;
                    }
                    input{
                        border: none;
                        border-bottom: 2px solid $secondary;
                        background: transparent;
                        margin-top: .3rem;
                        padding: .5rem 1rem;
                    }
                }
            }
        }
        .login__button{
            padding: .7rem;
            width: 80%;
            margin: 2rem auto 0;
            font-size: 1rem;
            letter-spacing: 2px;
            font-weight: 900;
            color: $secondary;
            background: transparent;
            border: 10px double $secondary;
            &:focus{
                background: black;
                color: white;
            }
        }
    }
}
</style>