<template>
  <div class="register">
    <div class="greek-geek__title">
        <h1 class="top">GreekGeek</h1>    
        <div class="bottom"></div>
    </div>
    <div class="register__container">
        <div class="register__main">
            <form class="register-form">
                <AuthInput   
                    name="username"
                    type="text"
                    v-model="username"
                />
                <AuthInput   
                    name="email"
                    type="email"
                    v-model="email"
                />
                <!-- passwords -->
                <div class="input-field">
                    <label for="password">Choose password</label>
                    <div class="input-field__container input--password">
                        <input class="input-field__password password" type="password" id="password" v-model="password">
                        <font-awesome-icon @click="changeInputType()" class="fa-eye" :icon="['fa', 'eye']"/>
                    </div>
                </div>

                <div class="input-field ">
                    <label for="password">Confirm password</label>
                    <input 
                        class="input-field__not-password input-field__password-confirm  password input--password-confirm" 
                        type="password" 
                        id="password" 
                        v-model="confirmedPassword"
                    >
                </div>
      
      
                <AuthNotification :text="text"/>

                <!-- register buttons -->
                <div class="auth__buttons">
                    <BaseButton
                        text="REGISTER"
                        kind="auth"
                        width="80%"
                        @click="registerUser"
                    />
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
import AuthInput from '@/components/auth/auth-items/AuthInput.vue'
import AuthNotification from '@/components/auth/auth-items/AuthNotification.vue'

export default {
    name: 'RegisterForm',
    components: {
        AuthInput,
        AuthNotification
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmedPassword: '',
            text: '',
            users: [],
            classesArr : [
                'input--username',
                'input--email',
                'input--password',
                'input--password-confirm',
            ],
            errorClass: "input--error",
            successClass: "input--success"
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
                "greek-geek4.jpg",
                "greek-geek5.jpg",
                "homer.jpg",
                "idiocrates.jpg",
                "polibo.jpg",
                "thucydides.jpg",
                "xenophanes.jpg",
                "xenophanes2.jpg"
            ]
            let randomNum = Math.floor(Math.random() * avatarList.length)
            return avatarList[randomNum]
        },
        removeErrorClassFromAll(classesArr, errorClass) {
            for(let i = 0; i < classesArr.length; i++) {
                let current = document.querySelector('.' + classesArr[i])
                if(current.classList.contains(errorClass)) {
                    current.classList.remove(errorClass)
                }
            }
        },
        addClassToAll(classesArr, yourClass) {
            for(let i = 0; i < classesArr.length; i++) {
                document.querySelector('.' + classesArr[i]).classList.add(yourClass)
            }
        },
        markErrorInput(classNameToMark) {
            this.removeErrorClassFromAll(this.classesArr, this.errorClass)
            let input = document.querySelector(".input--" + classNameToMark)
            input.classList.add(this.errorClass)
        },
        getUsers() {
            db.collection("users")
                .get()
                .then(snapshot => {
                    snapshot.forEach(user => {
                        this.users.push(user.data().username)
                    })
                })
        },
        checkPassword() {
            if(this.password.length >= 8) {
                if(this.password === this.confirmedPassword) {
                    this.createUser() 
                } else {
                    this.text = "Your password does not match, please check."
                    this.markErrorInput("password")
                    this.markErrorInput("password-confirm")
                }
            } else {
                this.text = "Your password must be at least 8 characters long!"
                this.markErrorInput("password")
                this.markErrorInput("password-confirm")
            }
        },
        validateUsername(username) {
            let isUsernameOk = true;
            for(let i = 0; i < this.users.length; i++) {
                if(username === this.users[i]) {
                    console.log("Name matched")
                    isUsernameOk = false
                }
            }
            return isUsernameOk
        },
        createUser() {
            try {
                auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        document.querySelector(".notification__auth").classList.add("notification__auth--success")
                        this.text = "Successfully registered 🎉"
                        this.addClassToAll(this.classesArr, this.successClass)
                        this.$router.push("/")
                        db.collection('users').doc(cred.user.uid).set({
                            goal: 100,
                            pushupsToday: 0, 
                            username: this.username,
                            userImg: this.chooseRandomAvatar(),
                            attempts: 0
                        })
                    },
                    err => {
                        this.text = err.message
                    }
                )
            } catch(err) {
                console.log(err)
                this.text(err)
            } 

        },
        registerUser(event){
            event.preventDefault();
            if(this.username && this.email && this.password && this.confirmedPassword) {
                let isUsernameOk = this.validateUsername(this.username)
                if(isUsernameOk) {
                    this.checkPassword()
                } else {
                    this.text = "Username taken, please try something else."
                    this.markErrorInput("username")
                }
            } else {
                this.text = "Please fill in all the input areas."
                this.addClassToAll(this.classesArr, this.errorClass)
            }
        },
    },
    created(){
        this.getUsers()
        this.chooseRandomAvatar()
        console.log(auth)
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
    .greek-geek__title {
        text-align: center;
        padding: 1rem;
        background: black;
        color: white;
        border-radius: 5px;
        margin: -5px 15px 10px;
    }
    .register__container{
        z-index: 1;
        min-height: 86vh;
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
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
                .input--error {
                    border: 2px solid red !important;
                    // animation: move-L-R 1.5s ease-in;
                }                
                .input--success {
                    border: 2px solid green !important;
                }
                @keyframes move-L-R {
                    0% { transform: translateX(0) } 
                    25% { transform: translateX(-5px) }
                    50% { transform: translateX(5px) }
                    70% { transform: translateX(-5px) }
                    100% { transform: translateX(0) }
                }
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
                    .input-field__not-password,
                    .input-field__password-confirm{
                        border: none;
                        background: transparent;
                        border: 2px solid $secondary;
                        border-radius: 10px;
                        margin-top: .3rem;
                        padding: 1rem;
                        outline: none;
                        transition: all 0.3s ease-in;
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
                            padding: 1rem;
                            outline: none;
                            border-radius: 10px 0 0 10px;
                            transition: all 0.3s ease-in;
                        }
                        .fa-eye {
                            padding: 12.5px 13px;
                            border-radius:  0 5px 5px 0;
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
            }
        }
        .auth__buttons {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }

    }
}
</style>