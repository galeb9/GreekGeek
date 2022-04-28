<template>
  <div class="my-profile">

    <div class="go__back" @click="goHome" >
        <font-awesome-icon class="back-icon" :icon="['fa', 'arrow-left']"/>
    </div>

    <div class="go__messages" @click="goMessages" >
        <font-awesome-icon class="messages-icon" :icon="['fa', 'dove']"/>
        <div class="messge-status">
            <p>!</p>
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

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router-view{
  padding:0 !important ;
}
.my-profile{
    position: relative;
    .go__back,
    .go__messages{
        position: absolute;
      
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
    .go__back{
        top: 15px;

        left: 10px;
        width: 50px;
        height: 50px;
    }
    .go__messages{
        top: 10px;
        right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        .messages-icon{
            font-size: 1.2rem;
        }
        .messge-status{
            animation: breathe 1s infinite alternate ease-in-out;
            position: absolute;
            bottom: 0;
            right: 0;
            background: $error;
            width: 22px;
            height: 22px;
            border-radius: 2px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                transform: rotate(-45deg);
                font-size: .8rem;
            }
        }
    }
    .bg-image{
        // position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100vw;
    }
    .my-profile__info{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        text-align: center;
        z-index: 2;
        transform: translateY(-100px);
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
@keyframes breathe {
    from{
        transform: scale(1) rotate(45deg);
    }
    to{
        transform: scale(1.1) rotate(45deg);
    }
}
</style>