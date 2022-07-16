<template>
  <div class="register">
    <div class="register__container">
        <!-- <img class="auth-img" src="@/assets/img/greek-body.png" alt=""> -->
        <div class="register__main">
            <!-- <div class="app-title">
                <h2>GreeK GeeK</h2> 
            </div> -->
            <form class="register-form">
                <div class="input-field">
                    <label for="username">Username</label>
                    <input class="input-field__not-password"  type="text" id="username" v-model="username">
                </div>
                <div class="input-field">
                    <label for="email">Email</label>
                    <input class="input-field__not-password" type="email" id="email" v-model="email">
                </div>
                <div class="input-field">
                    <label for="password">Choose password</label>
                    <div class="input-field__container">
                        <input class="input-field__password password" type="password" id="password" v-model="password">
                        <font-awesome-icon @click="changeInputType()" class="fa-eye" :icon="['fa', 'eye']"/>
                    </div>
                </div>
                <div class="input-field">
                    <label for="password">Confirm password</label>
                        <input class="input-field__not-password password" type="password" id="password" v-model="confirmedPassword">
          
                <div class="notification__auth">
                    <p v-if="text" class="notification__text">{{ text }}</p>
                </div>
                </div>
                <div class="register__buttons">
                    <!-- <button class="register__button" @click="registerUser">REGISTER</button> -->
                    <button class="register__button" @click="register">REGISTER</button>
                </div>
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
    name: 'RegisterForm',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmedPassword: '',
            text: '',
            isUsernameOK: false,
            isPasswordOK: false
        }
    },
    methods: {
        changeInputType() {
            const passwords = document.querySelectorAll(".password")
            document.querySelector(".fa-eye").classList.toggle("active-fa-eye")

            for(let i = 0; i < passwords.length; i++) {
                let password = passwords[i]
                if(password.getAttribute("type") === "password") {
                    password.setAttribute("type", "text")
                }else {
                    password.setAttribute("type", "password")
                }
            }
        },
        chooseRandomAvatar(){
            const avatarList = [
                "greek-geek.png",
                "greek-geek2.png",
                "greek-geek3.png",
                "greek-geek4.png",
                "greek-geek5.png",
                "homer.jpg",
                "idiocrates.jpg",
                "polibo.jpg",
                "thucydides.jpg",
                "xenophanes.jpg",
                "xenophanes2.jpg",
            ]
            let randomNum = Math.floor(Math.random() * avatarList.length)
            return avatarList[randomNum]
        },
        checkUsername() {
            const arr = []

            db.collection("users")
                .get()
                .then(snapshot => {
                    snapshot.forEach(user => {
                        arr.push(user.data().username)
                    })
                })
            console.log(arr)
        },
        checkPassword() {
            if(this.password.length >= 8) {
                if(this.password === this.confirmedPassword) {
                    this.isPasswordOK = true
                    console.log("password is ok")
                } else {
                    this.text = "Your password does not match, please check."
                }
            } else {
                this.text = "Your password must be at least 8 characters long!"
            }
        },
        createUser() {
            try {
                auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        alert(`Račun narejen za ${cred.user.email}`)
                        this.$router.push("/")
                        db.collection('users').doc(cred.user.uid).set({
                            goal: 100,
                            pushupsToday: 0, 
                            username: this.username,
                            userImg: this.chooseRandomAvatar(),
                            attempts: 0
                            //userId: auth.currentUser.uid
                        })
                        console.log("New user registered")
                    }
                )
            } catch(err) {
                console.log(err)
            } 

        },
        registerUser(event){
            event.preventDefault();
            // this.checkUsername()
            this.checkPassword()
            if(this.isPasswordOK) {
                this.createUser()
                console.log("user created")
            }
            this.text = null
            //document.querySelector(".notification__text").classList.add("notification__text--success")

        },
        register(e){ // old function that works?
            //figure out promises
            auth.createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    alert(`Račun narejen za ${cred.user.email}`)
                    this.$router.push("/")
                    db.collection('users').doc(cred.user.uid).set({
                        goal: 100,
                        pushupsToday: 0, 
                        username: this.username,
                        userImg: this.chooseRandomAvatar(),
                        attempts: 0
                        //userId: auth.currentUser.uid
                    })
                    console.log("New user registered")
                },
                err => {
                    alert(err.message)
                }
            )
            e.preventDefault();
        },
    },
    created(){
        this.chooseRandomAvatar()
        this.checkUsername()
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.register{
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    color: $secondary;
    // min-height: 120vh;
    .register__container{
        z-index: 1;
        min-height: 85vh;
        width: 85%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        // justify-content: space-between;
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
                margin: 0 auto;
                padding-bottom: 3px;
                margin-bottom: 2rem;
                letter-spacing: 2px;
                border-bottom: 1px solid black;
                max-width: max-content;
            }
            h4{
                text-align: center;
                margin-bottom: 1rem;
            }
        }
        .register__main{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .app-title{
                background: black;
                color: white;
                padding: 1rem ;
                text-align: center;
            }
            .register-form{
                display: flex;
                flex-direction: column;
                height: 100%;
                .input-field{
                    display: flex;
                    flex-direction: column;
                    margin-top: 1rem;
                    label{
                        font-weight: 700;
                        font-size: 1rem;
                        letter-spacing: 1px;
                        transform: translate(15px, 16px);
                        background: $bg;
                        width: max-content;
                        padding: 0 10px;
                    }
                    .input-field__not-password{
                        border: none;
                        background: transparent;
                        border: 2px solid $secondary;
                        border-radius: 10px;
                        margin-top: .3rem;
                        padding: 0.7rem 1rem;
                    }
                    .input-field__container {
                        display: flex;
                        align-items: center;
                        border: none;
                        border: 2px solid $secondary;
                        border-radius: 10px;
                        background: transparent;
                        margin-top: .3rem;
                        .input-field__password {
                            width: 100%;
                            border: none;
                            background: transparent;
                            border-right: 2px solid black;
                            padding: 0.7rem 1rem;
                            outline: none;
                        }
                        .fa-eye {
                            // background: red;
                            padding: 12.5px 13px;
                            border-radius:  0 8px 8px 0;
                            background: transparent;
                            color: black;
                            transition: all .2s ease-out;
                            cursor: pointer;
                            &:hover {
                                background: black;
                                color: white;
                            }
 
                        }
                        .active-fa-eye {
                            background: black;
                            color: white;
                        }
                    }
                }
                .notification__auth {
                    margin: 0.5rem 1rem 0 ;
                    min-height: 40px;
                    .notification__text {
                        color: $error;
                        font-weight: 700;
                        animation: fade-in-top 0.3s ease-in ;
                    }
                    .notification__text--success {
                        color: $success;
                    }
                    @keyframes fade-in-top {
                        0% {
                            opacity: 0;
                            transform: translateY(-20%);
                        }
                        100% {              
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                }
            }
        }
        .register__buttons {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            .register__button {
                padding: 1em 2em;
                font-size: 14px;
                font-weight: 900;
                color: $secondary;
                background: transparent;
                border: 8px double rgba($secondary, 0.8);
                &:focus{
                    background: black;
                    color: white;
                }
            }
        }

    }
}
</style>