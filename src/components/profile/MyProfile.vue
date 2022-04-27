<template>
  <div class="my-profile">

    <div class="go__back" @click="goHome" >
        <font-awesome-icon class="back-icon" :icon="['fa', 'arrow-left']"/>
    </div>

    <div class="go__messages" @click="goMessages" >
        <font-awesome-icon class="messages-icon" :icon="['fa', 'dove']"/>
        <div class="messge-status">
            <p>7</p>
        </div>
    </div>
    
    <img src="@/assets/img/profile-bg.png" alt="" class="bg-image">

    <div class="my-profile__info">
        <div class="my-profile__info-item">
            <h3 class="info-item__num">69</h3>
            <p class="info-item__name">Friends</p>
        </div>
        <div class="my-profile__info-avatar">
            <img 
                class="avatar__img" 
                :src="getImgUrl(userImg)" 
                alt=""
            >
            <h2 class="avatar__name">{{ username }}</h2>
        </div>
        <div class="my-profile__info-item">
            <h3 class="info-item__num">{{ goal }}</h3>
            <p class="info-item__name">Goal</p>
        </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'

export default {
    data(){
        return{
            userImg: 'greek-geek.png',
            username: 'user',
            goal: 100
        }
    },
    methods: {
        getUserData(){
            db.collection("users").doc(auth.currentUser.uid).get()
            .then(user => {
                this.userImg = user.data().userImg
                this.username = user.data().username
                this.goal = user.data().goal
            })
        },
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        goHome(){
            this.$router.push("/home")
        },
        goMessages(){
            console.log("Have to pave the road...")
        }
    },
    created(){
        this.getUserData();
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.my-profile{

    .go__back,
    .go__messages{
        position: absolute;
        top: 10px;
        width: 50px;
        height: 50px;
        border-radius: 3px;
        background: $bg;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        .back-icon{
            font-size: 1.1rem;
        }
    }
    .go__messages{
        right: 10px;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        .messages-icon{
            font-size: 1.2rem;
        }
        .messge-status{
            position: absolute;
            bottom: 0;
            right: 0;
            background: $error;
            width: 25px;
            height: 25px;
            // text-align: center;
            color: $bg;
            color: white;
            transform: rotate(45deg);
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                transform: rotate(-45deg);
            }
        }
    }
    .bg-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 1;
    }
    .my-profile__info{
        margin-top: 30vh;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        text-align: center;
        z-index: 2;

        position: absolute;
        top: -14%;
        left: 0;
        right: 0;
        .my-profile__info-item{
            padding-bottom: 1.5rem;
            .info-item__name{
                padding-top: 1rem;
            }
            .info-item__num{
                color: black;
            }
        }
        .my-profile__info-avatar{
            padding-top: 1rem;
            .avatar__img{
                width: 8rem;
                border: 4px solid white;
            }
            .avatar__name{
                padding-top: 1rem;
                color: black;

            }
        }
    }
}
</style>