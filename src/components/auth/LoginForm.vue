<template>
  <div class="login">
    <div class="greek-geek__title">
        <h1 class="top">GreekGeek</h1>    
        <div class="bottom"></div>
    </div>
    <div class="login-container">
        <form class="login-form">
            <div class="auth__inputs">
                <AuthInput   
                    name="email"
                    type="email"
                    v-model="email"
                />
                <AuthInputPassword v-model="password" />
                <!-- <router-link to="/reset-password">
                    <h3>Forgot password?</h3>
                </router-link> -->
                <AuthNotification :text="text" />
            </div>

            <div class="auth__buttons">
                <BaseButton
                    text="LOGIN"
                    kind="auth"
                    width="80%"
                    @click="login"
                />
                <!-- <div class="mid-line"></div> -->
            </div>
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
import AuthInput from '@/components/auth/auth-items/AuthInput.vue'
import AuthInputPassword from '@/components/auth/auth-items/AuthInputPassword.vue'
import AuthNotification from '@/components/auth/auth-items/AuthNotification.vue'


export default {
    name: 'LoginForm',
    components: {
        AuthInput,
        AuthInputPassword,
        AuthNotification
    },
    data() {
        return {
            email: '',
            password: '',
            text: ''
        }
    },
    methods: {
        login(e){
            auth.signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    alert(`Ste logirani not kot ${cred.user.email}`)
                    this.$router.push('/')
                },
                err => {
                    // alert(err.message)
                    this.text = err.message
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
    position: relative;
    .greek-geek__title {
        text-align: center;
        padding: 1rem;
        background: black;
        color: white;
        border-radius: 5px;
        border-radius: 5px;
        margin: -5px 15px 10px;
    }
    .login-container{
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 90%;
        min-height: 82vh;
        margin: 0 auto;
        .or {
            h3{
                text-align: center;
                margin: 0 auto;
                margin-bottom: 2rem;
                letter-spacing: 2px;
                border-bottom: 1px solid black;
                padding: 0 4px;
                padding-bottom: 3px;
                max-width: max-content;
            }
            h4{
                text-align: center;
                margin-bottom: 1rem;
            }
        }

        .login-form{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            flex: 1;
            .auth__inputs{

            }
            .auth__buttons {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                padding: 2rem 0;
                .mid-line{
                    width: 12px;
                    height: 12px;
                    transform: rotate(45deg);
                    background: $secondary;
                    background: transparent;
                    border: 3px solid black;
                    border-radius: 3px;
                    margin: 0 1rem auto ;
                }
            }
        }

 
    }

}
</style>