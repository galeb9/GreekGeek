<template>
  <div class="my-profile">

    <div class="go__back" @click="goHome" >
        <font-awesome-icon class="back-icon" :icon="['fa', 'arrow-left']"/>
    </div>
    <!-- messages -->
    <div class="go__messages" @click="toggleMessageVisibility"  >
        <font-awesome-icon class="messages-icon" :icon="['fa', 'dove']"/>
        <div class="messge-status">
            <p>!</p>
        </div>
    </div>
    <div class="notifications-container" v-if="messagesVisible">
        <h2>Notifications</h2>
        <div class="messages-list">

            <div 
                class="message__item"
                v-for="(el,index) in requests"
                :key="index"
                @click="togglemessageBtnsVisible"
            >
                <div class="message__main">
                    <img 
                        class="message__img" 
                        :src="getImgUrl(el.messagePic)" 
                        alt=""
                    >
                    <div>
                        <p>
                            <span>{{ el.username }}</span> sent you a friend request. 
                        </p>
                        <transition name="move-in-bottom">
                            <div class="message__btns" v-if="messageBtnsVisible">
                                <BaseButton text="Confirm" />
                                <BaseButton text="Deny" @click="denyRequest(key)"/>
                            </div>
                        </transition>
                    </div>
                </div>
    
            </div>
           
        </div>
    </div>
    



    <img src="@/assets/img/profile-bg.png" alt="" class="bg-image">

    <!-- profile info -->
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
            goal: 100,
            messagesVisible: true,
            requests: [],
            messageBtnsVisible: false
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
        getMessages(){
            db.collection("users").doc(auth.currentUser.uid).collection("friend-requests").get()
                .then(snapshot=> {
                    snapshot.forEach(doc => {
                        this.requests.push({
                            username: doc.id,
                            status: doc.data().friends,
                            messagePic: doc.data().profileImage
                        })
                        console.log(this.requests)
                    })
                })
        },
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        goHome(){
            this.$router.push("/home")
        },
        toggleMessageVisibility(){
            this.messagesVisible = !this.messagesVisible
        },
        togglemessageBtnsVisible(){
            this.messageBtnsVisible = !this.messageBtnsVisible
        },
        confirmRequset(){
            
        },
        denyRequest(i){
            this.requests = this.requests.slice(i, 1) // make this work
        }
        
    },
    created(){
        this.getUserData();
        this.getMessages(); 
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
    .notifications-container{
        padding: 1rem;
        // height: 100%;
        min-height: 100%;
        background: $bg;
        position: absolute;
        left: 0;
        right: 0;
        top: 20vh;
        z-index: 4;
        h2{
            margin-bottom: 1rem;
        }

        .messages-list{

            .message__item{
           
                .message__main{
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    span{
                        font-weight: 700;
                    }
                    .message__img{
                        width: 4rem;
                        height: 4rem;
                        border-radius: 50%;
                        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
                    }
                }
                .message__btns{
                    // padding: 1rem 0;
                    padding-top: .8rem;
                    display: flex;
                    gap: 1rem;
                    // border-bottom: 1px solid black;
                }
            }
        }
    }
    .go__back,
    .go__messages{
        position: absolute;
      
        border-radius: 3px;
        background: $bg;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
        transition: all .1s ease-in;
        &:active{
            transform: translateY(3px);
            box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
        }
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
                border-radius: 4px;
                box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
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
        transform: scale(.95) rotate(45deg);
    }
    to{
        transform: scale(1.05) rotate(45deg);
    }
}
</style>