<template>
  <div class="login">
    <div class="login-container">
        <form class="login-form">
            <div class="input-field">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email">
            </div>
            <div class="input-field">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password">
            </div>
            <button class="login__button" @click="login">LOGIN</button>
            <div class="mid-line"></div>
        </form>
        <div class="or">
            <h4>OR</h4>
            <router-link to="/register">
                <h3> Register for an account</h3>
            </router-link>
        </div>

    </div>
  </div>
</template>

<script>
import { auth } from '@/components/firebaseInit.js'
// import firebase from 'firebase/compat/app';

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login(e){
            auth.signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    alert(`Ste logirani not kot ${cred.user.email}`)
                    //this.$router.go({path : this.$router.path});
                    this.$router.push('/')
                },
                err => {
                    alert(err.message)
                }
            )
            e.preventDefault();
        },
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
    .login-container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80%;
        min-height: 90vh;
        margin: 0 auto;
        .or {
            h3{
                text-align: center;
                padding-bottom: 3px;
                margin-bottom: 2rem;
                letter-spacing: 2px;
                border-bottom: 1px solid $secondary;
            }
            h4{
                text-align: center;
                margin-bottom: 1rem;
            }
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
            .mid-line{
                width: 12px;
                height: 12px;
                transform: rotate(45deg);
                background: $secondary;
                margin: 1rem auto ;

            }
        }
      
        .login__button{
            padding: .7rem ;
            line-height: 1.5rem;
            width: 80%;
            margin: 0 auto;
            margin-top: 2rem;
            font-size: 1rem;
            letter-spacing: 2px;
            font-weight: 900;
            color: $secondary;
            background: transparent;
            border: 10px double $secondary;
            &:last-child{
                margin-top: 0;
            }
            &:focus{
                background: black;
                color: white;
            }
        }
    }

}
</style>