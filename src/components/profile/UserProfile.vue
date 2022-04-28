<template>
    <div class="user-profile">

        <div class="go__back" @click="closePopup" >
            <font-awesome-icon class="back-icon" :icon="['fa', 'arrow-left']"/>
        </div>
        
        <img src="@/assets/img/profile-bg.png" alt="" class="bg-image">

        <div class="user-profile__info">
            <div class="user-profile__info-item">
                <h3 class="info-item__num">69</h3>
                <p class="info-item__name">Friends</p>
            </div>
            <div class="user-profile__info-avatar">
                <img 
                    class="avatar__img" 
                    :src="getImgUrl(img)" 
                    alt=""
                >
                <h2 class="avatar__name">{{ name }}</h2>
            </div>
            <div class="user-profile__info-item">
                <h3 class="info-item__num">{{ goal }}</h3>
                <p class="info-item__name">Goal</p>
            </div>
        </div>

        <div class="profile__btns">
            <button class="profile__btn" @click="sendFriendRequest">Send Friend Request</button>
            <div class="notification-container">
                <transition name="move-in-bottom">
                    <p class="notification__suceess" v-if="notifVisible">
                        Friend request sent to {{ name }}
                    </p>
                </transition>
            </div>
        </div>

   

    </div>

</template>

<script>
import { db,auth } from '@/components/firebaseInit.js'

export default {
    props: {
        img: {
            type: String,
            default: 'greek-geek.png'
        },
        name: {
            type: String,
            default: ''
        },
        goal: {
            type: Number,
            default: 100
        }
    },
    data(){
        return{
            userImg: 'greek-geek.png',
            username: 'user',
            notifVisible: false,
            friendId: '',
            friendProfilePic: '',
            currentFriend: '',

            myName: null,
            myImg: null,
            myId: null
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        closePopup(){
            this.$emit('close-popup')
        },
        useNotification(){
            this.notifVisible = true
            setTimeout(() => {
                this.notifVisible = false
            },3000)
        },
        getPotentialFirendData(){
            console.log("getPotentialFirendData")

            db.collection("users").doc(this.friendId).get()
                .then(user => {
                    console.log("Potential Friend")
                    console.log(user.data())
                })
        },
        getUserData(){
            db.collection("users").doc(auth.currentUser.uid).get()
                .then(user => {
                    this.myName = user.data().username
                    this.myImg = user.data().userImg
                    this.myId = user.id
                    console.log(this.myName, this.myImg, this.myId)
                })
        },

        findFriendId(){
            console.log("findFriendId")
            const users = db.collection("users")
            users.where("username", "==", this.username).get()
                .then(snapshot => {
                    snapshot.forEach(user => {
                        console.log('UserID:' + user.id + '\nusername: ' + user.data().username )
                        this.friendId = user.id
                        // this.friendProfilePic = user.data().userImg
                        // this.currentFriend = user.data().username
                        // console.log("id: " + this.friendId)
                        // console.log("pic: " + this.friendProfilePic)
                        // console.log("sender: " + this.currentFriend)

                    })
                })
        },
        saveMessageToFriend(){
            db.collection("users").doc(this.friendId)
                .collection("friend-requests")
                .doc(this.myName)
                .set({
                    friends: false,
                    profileImage: this.myImg,
                    username : this.myName,
                    friendID: this.myId
                })
        },
        sendFriendRequest(){

            this.findFriendId()
            setTimeout(this.saveMessageToFriend, 1000)
            setTimeout(this.getPotentialFirendData, 1000)
            

            console.log("Requset sent!")
            this.useNotification()
        }
    },
    created(){
        this.getUserData()
        this.username = this.name
        // console.log("potential friend: " + this.username)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router-view{
  padding:0 !important ;
}
.user-profile{
    background: $bg;
    width: 100vw;
    min-height: 100vh;
    position: relative;
    .notification-container{
        position: absolute;
        bottom: 14vh;
        left: 0;
        right: 0;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        .notification__suceess{
            width: max-content;
            background: $success;
            padding: 1rem 3rem;
            border-radius: 4px;
            // margin-left: 1rem;

        }
    }
    .profile__btns{
        position: relative;
        display: flex;
        justify-content: center;
        .profile__btn{
            padding: 1rem 3rem;
            // margin-left: 1rem;
            border: none;
            outline: none;
            color: white;
            background: black;
            border-radius: 4px;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
            transition: all .1s ease-in;
            &:active{
                transform: translateY(3px);
                box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
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
        .back-icon{
            font-size: 1.1rem;
        }
    }
    .go__back{
        top: 15px;
        left: 10px;
        width: 50px;
        height: 50px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
        transition: all .1s ease-in;
        &:active{
            transform: translateY(3px);
            box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
        }
    }
    .bg-image{
        top: 0;
        left: 0;
        z-index: 1;
        width: 100vw;
    }
    .user-profile__info{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        text-align: center;
        z-index: 2;
        transform: translateY(-100px);
        .user-profile__info-item{
            padding-bottom: 1.5rem;
            .info-item__name{
                padding-top: 1rem;
            }
            .info-item__num{
                color: black;
            }
        }
        .user-profile__info-avatar{
            padding-top: 1rem;

            .avatar__img{
                width: 8rem;
                border: 4px solid white;
                box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
            }
            .avatar__name{
                padding-top: 1rem;
                color: black;
            }
        }
    }
}
</style>